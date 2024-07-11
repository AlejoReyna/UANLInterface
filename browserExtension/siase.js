console.log('Script inyectado correctamente');
let extractedSiaseData = null;
let extractedTd18 = null;
let extractedbarraHeader = null;
let extractedLeftBar = null;

function extractLeftBar() {
  
    console.log('Iniciando extractLeftBar()');
    const leftFrame = document.querySelector('frame[name="left"]');
    if (leftFrame) {
        console.log('Frame izquierdo encontrado');
        if (leftFrame.contentDocument) {
            console.log('Documento del frame accesible');
            
            // Intentamos obtener el menú colapsable
            const leftBar = leftFrame.contentDocument.querySelector('ul.menu.collapsible');
            
            if (leftBar) {
                extractedLeftBar = leftBar.cloneNode(true);
                console.log('Menú colapsable extraído correctamente');

                const links = extractedLeftBar.querySelectorAll('a');
                links.forEach(link => {
                  link.addEventListener('click', handleLinkClick);
                });
            } else {
                console.log('No se encontró ul.menu.collapsible. Buscando alternativas...');
                
                // Buscar cualquier ul dentro del frame
                const anyUl = leftFrame.contentDocument.querySelector('ul');
                if (anyUl) {
                    extractedLeftBar = anyUl.cloneNode(true);
                    console.log('Se extrajo un ul alternativo');
                } else {
                    console.log('No se encontró ningún ul. Extrayendo todo el body.');
                    const bodyContent = leftFrame.contentDocument.body;
                    if (bodyContent) {
                        extractedLeftBar = bodyContent.cloneNode(true);
                        console.log('Contenido del body extraído como alternativa');
                    } else {
                        console.log('No se pudo extraer ni siquiera el body');
                    }
                }
            }
        } else {
            console.log('No se puede acceder al contenido del frame izquierdo');
        }
    } else {
        console.log('No se encontró el frame izquierdo');
    }

    if (!extractedLeftBar) {
        console.log('No se pudo extraer ningún contenido para leftBar');
    }
}

function extractSiaseData() {
  const topFrame = document.querySelector('frame[name="top"]');
  if (topFrame && topFrame.contentDocument) {
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


  } else {
    console.log('No se encontró el frame top o no se puede acceder a su contenido');
  }
}

function injectDiv() {
  if (window.location.href === "https://deimos.dgi.uanl.mx/cgi-bin/wspd_cgi.sh/default.htm") {

    const mainContentDiv = document.createElement('div');
    mainContentDiv.id = 'mainContent';
    mainContentDiv.style.position = 'fixed';
    mainContentDiv.style.top = '20vh';
    mainContentDiv.style.left = '20%';
    mainContentDiv.style.width = '80%';
    mainContentDiv.style.height = 'calc(100vh - 20vh)';
    mainContentDiv.style.overflowY = 'auto';
    mainContentDiv.style.backgroundColor = '#ffffff';
    mainContentDiv.style.padding = '20px';
    mainContentDiv.style.zIndex = '9997';
   
    const newDiv = document.createElement('div');
    newDiv.id = 'injectedDiv';
    newDiv.style.position = 'absolute';
    newDiv.style.top = '0';
    newDiv.style.left = '0';
    newDiv.style.width = '100%';
    newDiv.style.height = '15vh';
    newDiv.style.background = `url("${chrome.runtime.getURL('img/uanl-banner.jpg')}") no-repeat center center`;
    newDiv.style.backgroundSize = 'cover';
    newDiv.style.zIndex = '9999';
    newDiv.innerHTML = `
     <div class="row">

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

      <div class="row">
      <div id='barraContent'>
       
      </div>
      </div>
      
    `;

    const leftDiv = document.createElement('div');
    leftDiv.style.position = 'fixed';
    leftDiv.style.top = '20vh';
    leftDiv.style.left = '0';
    leftDiv.style.width = '20%';
    leftDiv.style.height = 'calc(100vh-15vh)';
    leftDiv.style.overflowY = 'auto';
    leftDiv.style.backgroundColor = '#f0f0f0';
    leftDiv.style.padding = '20px';
    leftDiv.style.boxShadow = '2px 0 5px rgba(0,0,0,0.1)';
    leftDiv.style.zIndex = '9998';
    leftDiv.innerHTML = `
    <div id="leftBar-content">
     <div class="here"></div>   
    </div>
        `;
    console.log('Intentando insertar leftBar');

        if (extractedLeftBar) {
            console.log('extractedLeftBar existe, intentando insertarlo');
            const leftBarContent = document.getElementById('leftBar-content');
            if (leftBarContent) {
                const hereDiv = leftBarContent.querySelector('.here');
                if (hereDiv) {
                    hereDiv.appendChild(extractedLeftBar);
                    console.log('Contenido del leftBar insertado correctamente');
                } else {
                    leftBarContent.appendChild(extractedLeftBar);
                    console.log('Contenido insertado directamente en leftBar-content');
                }
            } else {
                console.log('No se encontró el elemento leftBar-content');
            }
        } else {
            console.log('No hay contenido extraído para leftBar');
        }

    if (document.body) {
      document.body.appendChild(newDiv);
      document.body.appendChild(leftDiv);
      document.body.appendChild(mainContentDiv);
    } else {
      document.documentElement.appendChild(newDiv);
      document.documentElement.appendChild(leftDiv);
      document.documentElement.appendChild(mainContentDiv);
    }
    console.log('Div inyectado en la página correcta');

    // Insertar los datos de SIASE extraídos
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

    if (extractedLeftBar) {
        const leftBarContent = document.getElementById('leftBar-content');
        if (leftBarContent) {
            leftBarContent.appendChild(extractedLeftBar);
            console.log('Elemento leftBar insertado correctamente');
        }
    } else {
        console.log('No hay contenido extraído para leftBar');
    }

    // Insertar el elemento td[width="18%"] extraído
    if (extractedTd18) {
      const td18Content = document.getElementById('td18-content');
      if (td18Content) {
        td18Content.appendChild(extractedTd18);
        console.log('Elemento td[width="18%"] insertado correctamente');
      }
    }

    if (extractedbarraHeader) {
        const barraContent = document.getElementById('barraContent');
        if (barraContent) {
            barraContent.innerHTML = ''; // Limpiamos el contenido existente
            const links = extractedbarraHeader.querySelectorAll('a');
            links.forEach((link, index) => {
                const newLink = link.cloneNode(true);
                newLink.style.color = 'white';
                newLink.style.display = 'inline-block';
                newLink.style.padding = '5px 10px';
                newLink.style.textDecoration = 'none';
                barraContent.appendChild(newLink);
                console.log(`Enlace ${index + 1} insertado:`, newLink.outerHTML);
            });
            
            // Asegurarse de que el contenedor sea visible
            barraContent.style.backgroundColor = '#094988';
            barraContent.style.width = '100%';
            barraContent.style.minHeight = '40px';
            barraContent.style.display = 'flex';
            barraContent.style.alignItems = 'center';
            barraContent.style.justifyContent = 'space-around';
            barraContent.style.overflow = 'visible';
            
            console.log('Todos los enlaces insertados y estilizados');
        } else {
            console.log('No se encontró el elemento con id "barraContent"');
        }
    } else {
        console.log('No hay contenido extraído para barraHeader');
    }

    
  } else {
    console.log('No se inyectó el div porque no estamos en la página correcta');
  }
}

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

function init() {
    console.log('Iniciando extracción de contenido...');
    extractLeftBar();
    extractSiaseData();
    
    console.log('Removiendo frames...');
    // Remover frames después de extraer la información
    const topFrame = document.querySelector('frame[name="top"]');
    if (topFrame) topFrame.remove();
    const frameset = document.querySelector('frameset[cols="184,*"]');
    if (frameset) frameset.remove();
    const lastframeset = document.querySelector('frameset[rows="110,*"]');
    if (lastframeset) lastframeset.remove();
    
    console.log('Inyectando nuevo contenido...');
    injectDiv();
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

const barraContent = document.getElementById('barraContent');
console.log('Elemento barraContent:', barraContent);
