// Constantes y variables globales
let extractedSiaseData = null;
let extractedTd18 = null;
let extractedbarraHeader = null;
let extractedLeftBar = null;

// Funciones de extracción
function extractLeftBar() {
    console.log('Iniciando extractLeftBar()');
    const leftFrame = document.querySelector('frame[name="left"]');
    if (!leftFrame) {
        console.log('No se encontró el frame izquierdo');
        return;
    }

    if (!leftFrame.contentDocument) {
        console.log('No se puede acceder al contenido del frame izquierdo');
        return;
    }

    console.log('Frame izquierdo encontrado');
    console.log('Documento del frame accesible');
    
    const leftBar = leftFrame.contentDocument.querySelector('ul.menu.collapsible');
    if (leftBar) {
        extractedLeftBar = leftBar.cloneNode(true);
        console.log('Menú colapsable extraído correctamente');
        addEventListenersToLinks(extractedLeftBar);
    } else {
        extractAlternativeContent(leftFrame);
    }
}

function extractAlternativeContent(leftFrame) {
    console.log('No se encontró ul.menu.collapsible. Buscando alternativas...');
    const anyUl = leftFrame.contentDocument.querySelector('ul');
    if (anyUl) {
        extractedLeftBar = anyUl.cloneNode(true);
        console.log('Se extrajo un ul alternativo');
    } else {
        const bodyContent = leftFrame.contentDocument.body;
        if (bodyContent) {
            extractedLeftBar = bodyContent.cloneNode(true);
            console.log('Contenido del body extraído como alternativa');
        } else {
            console.log('No se pudo extraer ni siquiera el body');
        }
    }
}

function extractSiaseData() {
    const topFrame = document.querySelector('frame[name="top"]');
    if (!topFrame || !topFrame.contentDocument) {
        console.log('No se encontró el frame top o no se puede acceder a su contenido');
        return;
    }

    const siaseData = topFrame.contentDocument.querySelector('td[width="5%"][rowspan="2"][align="right"]');
    const td18 = topFrame.contentDocument.querySelector('td[width="18%"]');
    const elementsBar = topFrame.contentDocument.querySelector('td[bgcolor="#094988"][colspan="3"]');
    
    if (elementsBar) {
        extractedbarraHeader = elementsBar.cloneNode(true);
        console.log('Elemento barraHeader extraído correctamente');
        console.log('Número de enlaces en barraHeader:', extractedbarraHeader.querySelectorAll('a').length);
        console.log('HTML de barraHeader:', extractedbarraHeader.innerHTML);
    }
    
    if (siaseData) {
        extractedSiaseData = siaseData.cloneNode(true);
        console.log('SIASE data extraída correctamente');
    } else {
        console.log('No se encontró el elemento SIASE data en el frame top');
    }
    
    if (td18) {
        extractedTd18 = td18.cloneNode(true);
        console.log('Elemento td[width="18%"] extraído correctamente');
    } else {
        console.log('No se encontró el elemento td[width="18%"] en el frame top');
    }
}

// Funciones de inyección y manipulación del DOM
function injectDiv() {
    if (window.location.href !== "https://deimos.dgi.uanl.mx/cgi-bin/wspd_cgi.sh/default.htm") {
        console.log('No se inyectó el div porque no estamos en la página correcta');
        return;
    }

    const container = createMainContainer();
    const leftDiv = createLeftDiv();
    const mainContentDiv = createMainContentDiv();
    const newDiv = createBanner();

    container.appendChild(leftDiv);
    container.appendChild(mainContentDiv);
    mainContentDiv.appendChild(newDiv);

    const contentDiv = createContentDiv();
    mainContentDiv.appendChild(contentDiv);

    appendToBody(container);
    console.log('Estructura inyectada correctamente');

    insertExtractedData();
}

function createMainContainer() {
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100%';
  container.style.height = '100vh';
  container.style.display = 'flex';
  container.style.zIndex = '9997';
  container.style.background = `url("${chrome.runtime.getURL('img/uanl-bg.png')}") no-repeat center`;
  container.style.backgroundSize = 'cover';
  return container;
}

function createMainContentDiv() {
  const mainContentDiv = document.createElement('div');
  mainContentDiv.id = 'mainContent';
  mainContentDiv.style.width = '80%';
  mainContentDiv.style.height = '100vh';
  mainContentDiv.style.display = 'flex';
  mainContentDiv.style.flexDirection = 'column';
  mainContentDiv.innerHTML = `
      <div id="mainBanner" style="flex-shrink: 0;"></div>
      <div style="flex-grow: 1; overflow-y: auto;">
          <div id="originalMainContent"></div>
          <iframe id="centerFrame" name="center" style="width: 100%; height: 100%; border: none;"></iframe>
      </div>
  `;
  return mainContentDiv;
}

function createBanner() {
  const newDiv = document.createElement('div');
  newDiv.id = 'injectedDiv';
  newDiv.style.display = 'none';
  newDiv.style.width = '100%';
  newDiv.style.height = '15vh';
  newDiv.style.minHeight = '100px';
  newDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
  newDiv.style.zIndex = '9999';
  newDiv.style.position = 'sticky';
  newDiv.style.top = '0';
  newDiv.innerHTML = `
      <div class="row siase-navbar">
          <div class="col-2">
              <img src="${chrome.runtime.getURL('img/siase.png')}" class='img-fluid m-2' alt="Logo de la Universidad Autónoma de Nuevo León"/>
          </div>
          <div class="col-10">
              <div id="siaseData-content">
                  <div class='d-flex justify-content-center'>
                      <div id="td18-content">
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div class="row">
          <div id='barraContent'>
          </div>
      </div>
  `;
  return newDiv;
}

function createContentDiv() {
    const contentDiv = document.createElement('div');
  
    return contentDiv;
}

function appendToBody(element) {
    if (document.body) {
        document.body.appendChild(element);
    } else {
        document.documentElement.appendChild(element);
    }
}

function insertExtractedData() {
    insertSiaseData();
    insertLeftBar();
    insertTd18();
    insertBarraHeader();
}

function insertSiaseData() {
    if (extractedSiaseData) {
        const siaseContent = document.getElementById('siaseData-content');
        if (siaseContent) {
            const siaseDiv = siaseContent.querySelector('.d-flex.justify-content-center');
            if (siaseDiv) {
                siaseDiv.appendChild(extractedSiaseData);
                console.log('SIASE data insertada correctamente');
            }
        }
    }
}

function insertLeftBar() {
    if (extractedLeftBar) {
        const leftBarContent = document.getElementById('leftBar-content');
        if (leftBarContent) {
            leftBarContent.appendChild(extractedLeftBar);
            console.log('Elemento leftBar insertado correctamente');
        }
    } else {
        console.log('No hay contenido extraído para leftBar');
    }
}

function insertTd18() {
    if (extractedTd18) {
        const td18Content = document.getElementById('td18-content');
        if (td18Content) {
            td18Content.appendChild(extractedTd18);
            console.log('Elemento td[width="18%"] insertado correctamente');
        }
    }
}

// Function that sets the vertical menubar in the sidebar
function insertBarraHeader() {
    if (extractedbarraHeader) {
        const barraContent = document.getElementById('barraContent');
        if (barraContent) {
            barraContent.innerHTML = '';
            const links = extractedbarraHeader.querySelectorAll('a');
            links.forEach((link, index) => {
                const newLink = createStyledLink(link);
                const insertionPoint = document.querySelector('#leftBar-content .here');
                insertionPoint.appendChild(newLink);
                console.log(`Enlace ${index + 1} insertado:`, newLink.outerHTML);
            });
            styleBarraContent(barraContent);
            console.log('Todos los enlaces insertados y estilizados');
        } else {
            console.log('No se encontró el elemento con id "barraContent"');
        }
    } else {
        console.log('No hay contenido extraído para barraHeader');
    }
}

// Function that modifies the menu opened while clicking in a sidebar
function createStyledLink(link) {
    const newLink = link.cloneNode(true);
    newLink.style.color = 'white';
    newLink.style.display = 'block';
    newLink.style.padding = '5px 10px';
    newLink.style.textDecoration = 'none';
    newLink.target = 'left';
    newLink.onclick = handleLinkClick;
    return newLink;
}

function createLeftDiv() {
    const leftDiv = document.createElement('div');
    leftDiv.style.width = '20%';
    leftDiv.style.height = '100%';
    leftDiv.style.overflowY = 'auto';
    leftDiv.style.backgroundColor = 'rgba(2, 35, 66, 0.8)';
    leftDiv.style.boxShadow = '2px 0 5px rgba(0,0,0,0.1)';
    leftDiv.style.zIndex = '9998';
    leftDiv.innerHTML = `
        <div id="leftBar-content" style="padding: 20px;">
            <div class="here"></div>
        </div>
        <iframe id="leftFrame" name="left"
                style="width: 100%;
                height: calc(100% - 20px);
                border: none;">
                </iframe>
    `;
  
     // Modificar el contenido del iframe una vez que se cargue
     const iframe = leftDiv.querySelector('#leftFrame');
     iframe.onload = function() {
         try {
             const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
             const iframeBody = iframeDocument.body;
             const iframeAnchors = iframeDocument.getElementsByTagName('a');
             const iframeLi = iframeDocument.getElementsByTagName('li');
            
             if (iframeLi.length > 0) {
                // Crear un estilo para sobrescribir el fondo de los enlaces
                const style = iframeDocument.createElement('style');
                style.textContent = `
                li {
                    border-bottom: none !important;
                }
            `;
                iframeDocument.head.appendChild(style);
            
                // Adicionalmente, eliminar cualquier atributo 'background' y estilo inline
                Array.from(iframeLi).forEach(li => {
                    li.style.removeProperty('border-bottom')
                });
            
                console.log('Border bottom eliminado correctamente');
            } else {
                console.log('No se encontraron elementos li en el iframe');
            }
  
             if (iframeAnchors.length > 0) {
              // Crear un estilo para sobrescribir el fondo de los enlaces
              const style = iframeDocument.createElement('style');
              style.textContent = `
                  a {
                      background: none !important;
                      background-color: transparent !important;
                  }
              `;
              iframeDocument.head.appendChild(style);
          
              // Adicionalmente, eliminar cualquier atributo 'background' y estilo inline
              Array.from(iframeAnchors).forEach(anchor => {
                  anchor.removeAttribute('background');
                  anchor.style.removeProperty('background');
                  anchor.style.removeProperty('background-color');
              });
          
              console.log('Fondo de los enlaces eliminado correctamente');
          } else {
              console.log('No se encontraron enlaces en el iframe');
          }
          
             
             
             if (iframeBody) {
                 // Eliminar el atributo bgcolor si existe
                 iframeBody.removeAttribute('bgcolor');
                 
                 // Crear y añadir un estilo para asegurar que el fondo se aplique
                 const style = iframeDocument.createElement('style');
                 iframeDocument.head.appendChild(style);
                 iframeBody.style.padding = '5px 10px';
                 
             } 
          } catch (error) {
              console.error('Error al acceder al contenido del iframe:', error);
          }
     };
  
  
  
    return leftDiv;
  }
  




/** 
 *  Unused function
 
    function styleBarraContent(barraContent) {
    barraContent.style.backgroundColor = 'red';
    barraContent.style.width = '100%';
    barraContent.style.minHeight = '40px';
    barraContent.style.display = 'flex';
    barraContent.style.alignItems = 'center';
    barraContent.style.justifyContent = 'space-around';
    barraContent.style.overflow = 'visible';
}

**/

// Event Handlers
function handleLinkClick(event) {
    event.preventDefault();
    const url = event.target.href;
    loadContent(url);
}

function loadContent(url) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const content = doc.body.innerHTML;
            document.getElementById('mainContent').innerHTML = content;
        })
        .catch(error => {
            console.error('Error al cargar el contenido:', error);
        });
}

// Función de inicialización
function init() {
    console.log('Iniciando extracción de contenido...');
    extractSiaseData();
    
    console.log('Removiendo frames...');
    const lastframeset = document.querySelector('frameset[rows="110,*"]');
    if (lastframeset) lastframeset.remove();
    
    console.log('Inyectando nuevo contenido...');
    injectDiv();
}

// Event Listeners
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Utilidades
function addEventListenersToLinks(element) {
    const links = element.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', handleLinkClick);
    });
}

// Logging
console.log('Script inyectado correctamente');
const barraContent = document.getElementById('barraContent');
console.log('Elemento barraContent:', barraContent);