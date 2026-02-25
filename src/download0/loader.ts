import { libc_addr } from 'download0/userland'
import { fn, mem, BigInt, utils } from 'download0/types'
import { lapse } from 'download0/lapse'
import { binloader_init } from 'download0/binloader'
import { checkJailbroken } from 'download0/check-jailbroken'

// --- CARGA DE DEPENDENCIAS SEGURA ---
if (typeof libc_addr === 'undefined') {
  include('userland.js')
}

// Intentamos cargar estadísticas, pero si fallan (círculo rojo), el exploit sigue
try {
  include('stats-tracker.js')
} catch(e) {
  log('Stats no disponibles, ignorando...')
}

include('binloader.js')
include('lapse.js')
include('kernel.js')
include('check-jailbroken.js')

log('Scripts de carga listos - Versión Ultra Light')

export function show_success () {
  setTimeout(() => {
    log('Exploit exitoso registrado...')
    // Intentamos registrar éxito si stats existe
    try {
      // @ts-ignore
      if (typeof stats !== 'undefined') stats.incrementSuccess()
    } catch(e) {}
  }, 2000)
}

// --- ELIMINADO TOTALMENTE EL BLOQUE DE AUDIO/MÚSICA ---

const is_jailbroken = checkJailbroken()

function is_exploit_complete () {
  fn.register(24, 'getuid', [], 'bigint')
  const uid = fn.getuid()
  const uidVal = uid instanceof BigInt ? uid.lo : uid
  return uidVal === 0
}

if (!is_jailbroken) {
  // Intentamos registrar intento si stats existe
  try {
    // @ts-ignore
    if (typeof stats !== 'undefined') stats.incrementTotal()
  } catch(e) {}
  
  const use_lapse = true 

  if (use_lapse) {
    log('Iniciando Lapse...')
    lapse()

    const start_time = Date.now()
    const max_wait_seconds = 40
    const max_wait_ms = max_wait_seconds * 1000

    while (!is_exploit_complete()) {
      const elapsed = Date.now() - start_time
      if (elapsed > max_wait_ms) {
        log('ERROR: Tiempo de espera agotado')
        throw new Error('Lapse timeout')
      }
      // Pequeña espera para no saturar el procesador
      const poll_start = Date.now()
      while (Date.now() - poll_start < 500) { }
    }
    
    show_success()
    log('Exploit completado con éxito')
  }

  if (use_lapse) {
    log('Inicializando binloader...')
    try {
      binloader_init()
    } catch (e) {
      log('Error Binloader: ' + (e as Error).message)
    }
  }
} else {
  utils.notify('Ya tienes Jailbreak!')
  include('main-menu.js')
}