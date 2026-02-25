import { libc_addr } from 'download0/userland'
import { stats } from 'download0/stats-tracker'
import { fn, mem, BigInt, utils } from 'download0/types'
import { sysctlbyname } from 'download0/kernel'
import { lapse } from 'download0/lapse'
import { binloader_init } from 'download0/binloader'
import { checkJailbroken } from 'download0/check-jailbroken'

// Cargamos dependencias
if (typeof libc_addr === 'undefined') {
  include('userland.js')
}
include('stats-tracker.js')
include('binloader.js')
include('lapse.js')
include('kernel.js')
include('check-jailbroken.js')
log('Scripts de carga listos')

// Cargar estadísticas
stats.load()

export function show_success () {
  setTimeout(() => {
    // La imagen bg_success ahora se maneja internamente en lapse.js
    log('Exploit exitoso registrado...')
    stats.incrementSuccess()
  }, 2000)
}

// --- MODIFICACIÓN LIGHT: Se eliminó el bloque de Audio aquí ---

const is_jailbroken = checkJailbroken()

function is_exploit_complete () {
  fn.register(24, 'getuid', [], 'bigint')
  const uid = fn.getuid()
  const uidVal = uid instanceof BigInt ? uid.lo : uid
  return uidVal === 0
}

if (!is_jailbroken) {
  stats.incrementTotal()
  
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
      log('Error en binloader: ' + (e as Error).message)
      throw e
    }
  }
} else {
  utils.notify('Ya tienes Jailbreak activo!')
  include('main-menu.js')
}

export function run_binloader () {
  log('Reiniciando binloader...')
  try {
    binloader_init()
  } catch (e) {
    log('Error: ' + (e as Error).message)
  }
}
