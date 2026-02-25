import { lang, useImageText, textImageBase } from 'download0/languages'
import { libc_addr } from 'download0/userland'
import { fn, BigInt } from 'download0/types'

(function () {
  include('languages.js')
  log(lang.loadingMainMenu)

  let currentButton = 0
  const buttons: Image[] = []
  const buttonTexts: jsmaf.Text[] = []

  const normalButtonImg = 'file:///assets/img/button_over_9.png'
  const selectedButtonImg = 'file:///assets/img/button_over_9.png'

  // Limpiar pantalla
  jsmaf.root.children.length = 0

  new Style({ name: 'white', color: 'white', size: 24 })
  new Style({ name: 'title', color: 'white', size: 32 })

  // === ESTA ES TU IMAGEN DE FONDO (INTACTA) ===
  const background = new Image({
    url: 'file:///../download0/img/multiview_bg_VAF.png',
    x: 0,
    y: 0,
    width: 1920,
    height: 1080
  })
  jsmaf.root.children.push(background)
  // ===========================================

  // Opciones del menú (Sin el botón de música)
  const menuOptions = [
    { text: lang.jailbreak, script: 'loader.js' },
    { text: lang.payloadMenu, script: 'payload_host.js' },
    { text: lang.config, script: 'config_ui.js' }
  ]

  // Dibujar los botones sobre el fondo
  for (let i = 0; i < menuOptions.length; i++) {
    const x = 800
    const y = 400 + (i * 100)

    const btn = new Image({
      url: normalButtonImg,
      x: x,
      y: y,
      width: 320,
      height: 60
    })

    const txt = new jsmaf.Text({
      text: menuOptions[i].text,
      style: 'white',
      x: x + 40,
      y: y + 15
    })

    buttons.push(btn)
    buttonTexts.push(txt)
    jsmaf.root.children.push(btn)
    jsmaf.root.children.push(txt)
  }

  function updateHighlight() {
    for (let i = 0; i < buttons.length; i++) {
      if (i === currentButton) {
        buttons[i].url = selectedButtonImg
        buttonTexts[i].style = 'title'
      } else {
        buttons[i].url = normalButtonImg
        buttonTexts[i].style = 'white'
      }
    }
  }

  function handleButtonPress() {
    const selectedOption = menuOptions[currentButton]
    if (selectedOption && selectedOption.script) {
      log('Cargando ' + selectedOption.script + '...')
      try {
        include(selectedOption.script)
      } catch (e) {
        log('Error: ' + (e as Error).message)
      }
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
  log(lang.mainMenuLoaded)

})()
