import { libc_addr } from 'download0/userland'
import { stats } from 'download0/stats-tracker'
import { lang, useImageText, textImageBase } from 'download0/languages'

(function () {
  if (typeof lang === 'undefined') include('languages.js')
  
  log(lang.loadingConfig)

  // Limpiar pantalla y poner fondo
  jsmaf.root.children.length = 0
  const background = new Image({
    url: 'file:///../download0/img/multiview_bg_VAF.png',
    x: 0, y: 0, width: 1920, height: 1080
  })
  jsmaf.root.children.push(background)

  new Style({ name: 'white', color: 'white', size: 24 })
  new Style({ name: 'title', color: 'white', size: 32 })

  let currentButton = 0
  const buttons: jsmaf.Text[] = []

  // --- MODIFICACIÓN LIGHT: Se eliminó 'music' de las opciones ---
  const configOptions = [
    { key: 'autolapse', label: lang.autoLapse },
    { key: 'autoclose', label: lang.autoClose },
    { key: 'back', label: lang.back }
  ]

  for (let i = 0; i < configOptions.length; i++) {
    const txt = new jsmaf.Text({
      text: configOptions[i].label,
      style: 'white',
      x: 400,
      y: 300 + (i * 60)
    })
    buttons.push(txt)
    jsmaf.root.children.push(txt)
  }

  function updateHighlight() {
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].style = (i === currentButton) ? 'title' : 'white'
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
      if (configOptions[currentButton].key === 'back') {
        include('main-menu.js')
      } else {
        log('Ajuste cambiado: ' + configOptions[currentButton].key)
      }
    }
  }

  updateHighlight()
  log(lang.configLoaded)
})()
