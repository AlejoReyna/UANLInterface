// Este script se ejecutará cuando la extensión lo inyecte en la página
const topFrame = document.querySelector('frame[name="top"]');
if (topFrame) {
    topFrame.remove();
}

const frameset = document.querySelector('frameset[cols="184,*"]');
if (frameset) {
    frameset.remove();

    // Esperar un momento para asegurarse de que el frameset se haya eliminado

}

const lastframeset = document.querySelector('frameset[rows="110,*"]');
if (lastframeset) {
    lastframeset.remove();
}

console.log('Script inyectado correctamente');

function injectDiv() {
  // Comprobar si estamos en la página correcta
  if (window.location.href === "https://deimos.dgi.uanl.mx/cgi-bin/wspd_cgi.sh/default.htm") {
    const newDiv = document.createElement('div');
    newDiv.id = 'injectedDiv';
    newDiv.style.position = 'absolute';
    newDiv.style.top = '';
    newDiv.style.left = '';
    newDiv.style.width = '100%';
    // Modify this elements in the future, as the background doesnt display well and the height may not be appropiated
    newDiv.style.height = '20vh';
    newDiv.style.background = `url("${chrome.runtime.getURL('img/uanl-banner.jpg')}") no-repeat center center`;
newDiv.style.backgroundSize = 'cover';
    newDiv.style.zIndex = '9999';
    newDiv.textContent = 'Este es un div inyectado';
    
    if (document.body) {
      document.body.appendChild(newDiv);
    } else {
      document.documentElement.appendChild(newDiv);
    }
    console.log('Div inyectado en la página correcta');
  } else {
    console.log('No se inyectó el div porque no estamos en la página correcta');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectDiv);
} else {
  injectDiv();
}