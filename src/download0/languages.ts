// Configuración de Idioma "Ultra Light"
export const lang: Record<string, string> = {
  jailbreak: 'Jailbreak',
  payloadMenu: 'Payload Menu',
  config: 'Ajustes',
  back: 'Volver',
  autoLapse: 'Auto Lapse',
  autoClose: 'Auto Cerrar',
  loadingMainMenu: 'Cargando...',
  mainMenuLoaded: 'Listo'
}

// --- MODIFICACIÓN CLAVE PARA EVITAR EL BOTÓN ROJO ---

// 1. Forzamos a que NO busque en subcarpetas de idiomas (ar, ja, ko, etc.)
export let useImageText = false 

// 2. Apuntamos todas las peticiones de imagen a la raíz de tu carpeta img
export let textImageBase = 'file:///../download0/img/' 

// 3. PARCHE MAESTRO ANTI-AUDIO: 
// Si cualquier archivo (como serve.js o loader.js) intenta usar audio, 
// este código lo intercepta y lo anula para que no dé error 404.
// @ts-ignore
if (typeof jsmaf.AudioClip !== 'undefined' || jsmaf.AudioClip) {
    // @ts-ignore
    jsmaf.AudioClip = function() {
        this.open = function() { return true; };
        this.play = function() { return true; };
        this.stop = function() { return true; };
        this.volume = 0;
    }
}

log('Sistema de Idiomas: Protegido contra errores de archivos faltantes');