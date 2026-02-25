export const lang: Record<string, string> = {
  jailbreak: 'Jailbreak',
  payloadMenu: 'Payload Menu',
  config: 'Config',
  exit: 'Exit',
  back: 'Back',
  autoLapse: 'Auto Lapse',
  autoClose: 'Auto Close',
  loadingMainMenu: 'Cargando...',
  mainMenuLoaded: 'Listo'
}

export let useImageText = false 
export let textImageBase = 'file:///../download0/img/' 

// PARCHE MAESTRO: Esto evita que cualquier otro archivo cause error si busca audio
// @ts-ignore
if (typeof jsmaf.AudioClip === 'undefined' || jsmaf.AudioClip) {
    // @ts-ignore
    jsmaf.AudioClip = function() {
        this.open = function() { return true; };
        this.play = function() { return true; };
        this.stop = function() { return true; };
        this.volume = 0;
    }
}

log('Language system: Forced to English/Root assets and Audio Disabled')
