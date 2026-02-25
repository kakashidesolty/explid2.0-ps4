import { fn, mem, BigInt } from 'download0/types'
import { binloader_init } from 'download0/binloader'
import { libc_addr } from 'download0/userland'
import { lang, useImageText, textImageBase } from 'download0/languages'
import { checkJailbroken } from 'download0/check-jailbroken'

(function () {
  if (typeof libc_addr === 'undefined') {
    include('userland.js')
  }

  include('check-jailbroken.js')

  // Limpiar pantalla
  jsmaf.root.children.length = 0

  new Style({ name: 'white', color: 'white', size: 24 })
  new Style({ name: 'title', color: '#FFD700', size: 32 }) // Dorado para resaltar

  // Fondo (Ruta absoluta para evitar errores en GitHub)
  const background = new Image({
    url: 'file:///../download0/img/multiview_bg_VAF.png',
    x: 0,
    y: 0,
    width: 1920,
    height: 1080
  })
  jsmaf.root.children.push(background)

  let currentButton = 0
  const buttons: Image[] = []
  const buttonTexts: jsmaf.Text[] = []

  // Lista de Payloads (Asegúrate de que estos .bin estén en tu carpeta payloads)
  const payloads = [
    { text: 'GoldHEN', path: '/download0/payloads/goldhen.bin' },
    { text: 'WebRTE', path: '/download0/payloads/webrte.bin' },
    { text: 'PS4Debug', path: '/download0/payloads/ps4debug.bin' },
    { text: 'Volver', path: 'main-menu.js' }
  ]

  for (let i = 0; i < payloads.length; i++) {
    const x = 200
    const y = 200 + (i * 70)

    const btn = new Image({
      url: 'file:///assets/img/button_over_9.png', // Imagen interna de la PS4
      x: x,
      y: y,
      width: 400,
      height: 50
    })

    const txt = new jsmaf.Text({
      text: payloads[i].text,
      style: 'white',
      x: x + 20,
      y: y + 10
    })

    buttons.push(btn)
    buttonTexts.push(txt)
    jsmaf.root.children.push(btn)
    jsmaf.root.children.push(txt)
  }

  function updateHighlight() {
    for (let i = 0; i < buttons.length; i++) {
      buttonTexts[i].style = (i === currentButton) ? 'title' : 'white'
    }
  }

  function handleButtonPress() {
    const selection = payloads[currentButton]
    
    if (selection.path === 'main-menu.js') {
       // Para volver al menú usamos la ruta completa para que GitHub no se pierda
       include('main-menu.js')
       return
    }

    log('Lanzando Payload: ' + selection.path)
    try {
      const { bl_load_from_file } = binloader_init()
      bl_load_from_file(selection.path)
    } catch (e) {
      log('Error: ' + (e as Error).message)
      // Si el archivo .bin no existe en GitHub, aquí saldría el círculo rojo
    }
  }

  jsmaf.onKeyDown = function (keyCode) {
    if (keyCode === 6 || keyCode === 5) { // Abajo
      currentButton = (currentButton + 1) % buttons.length
      updateHighlight()
    } else if (keyCode === 4 || keyCode === 7) { // Arriba
      currentButton = (currentButton - 1 + buttons.length) % buttons.length
      updateHighlight()
    } else if (keyCode === 14) { // X
      handleButtonPress()
    }
  }

  updateHighlight()
  log('Payload Menu Ready')
})()