// Configuración de Idioma "Ultra Light" - Solo Inglés/Texto
export const lang: Record<string, string> = {
  jailbreak: 'Jailbreak',
  payloadMenu: 'Payload Menu',
  config: 'Config',
  exit: 'Exit',
  back: 'Back',
  autoLapse: 'Auto Lapse',
  autoClose: 'Auto Close',
  music: 'Music',
  loadingMainMenu: 'Loading...',
  mainMenuLoaded: 'Ready'
}

// Forzamos a que NO use las carpetas ar, ja, ko, zh
export let useImageText = false 
export let textImageBase = 'file:///../download0/img/' // Apunta a la raíz de img

// Si quieres usar las imágenes de los botones que están en la raíz de img:
useImageText = true 

log('Language system: Forced to English/Root assets')
