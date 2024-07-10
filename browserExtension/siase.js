function modifyFrameContent() {
    // Intenta acceder a los frames
    const frames = document.getElementsByTagName('frame');
    
    for (let frame of frames) {
        try {
            const frameDocument = frame.contentDocument || frame.contentWindow.document;
            frameDocument.body.style.backgroundColor = "pink";

            const uanlBanner = frameDocument.querySelector('img[src="https://deimos.dgi.uanl.mx/uanlimg/ws/foto2030.jpg"][width="534"][height="82"]');
            if (uanlBanner) {
            uanlBanner.remove();
            console.log('UANL banner image removed from frame:', frame.name);
            }
        } catch (e) {
            console.log('Error accessing frame:', e);
        }
    }
}

// Ejecuta la función cuando el documento principal esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', modifyFrameContent);
} else {
    modifyFrameContent();
}

console.log('DOM content loaded');
console.log('Document ready state:', document.readyState);
console.log('Body content:', document.body.innerHTML);