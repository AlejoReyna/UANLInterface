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

     // Crear un contenedor principal
     const container = document.createElement('div');
     container.style.position = 'fixed';
     container.style.top = '0';
     container.style.left = '0';
     container.style.width = '100%';
     container.style.height = '100vh';
     container.style.display = 'flex';
     container.style.zIndex = '9997';
     container.style.background = `url("${chrome.runtime.getURL('img/uanl-bg.png')}") no-repeat center center`;
     container.style.backgroundSize = 'cover';
 

     const leftDiv = document.createElement('div');
leftDiv.style.width = '20%';
leftDiv.style.height = '100vh';
leftDiv.style.overflowY = 'auto';
leftDiv.style.backgroundColor = 'rgba(2, 35, 66, 0.8)';
leftDiv.style.boxShadow = '2px 0 5px rgba(0,0,0,0.1)';
leftDiv.style.zIndex = '9998';
leftDiv.style.paddingTop = '15vh';
leftDiv.innerHTML = `
  <div id="leftBar-content" style="padding: 20px;">
    <div class="here"></div>
  </div>
  <iframe id="leftFrame" name="left" style="width: 100%; height: calc(100% - 20px); border: none;"></iframe>
`;
      const insertionPoint = leftDiv.querySelector('.here');


      // Modificar mainContentDiv
      const mainContentDiv = document.createElement('div');
      mainContentDiv.id = 'mainContent';
      mainContentDiv.style.width = '80%';
      mainContentDiv.style.height = '100vh';
      mainContentDiv.style.overflowY = 'auto';
   
    // Crear newDiv (banner)
    const newDiv = document.createElement('div');
    newDiv.id = 'injectedDiv';
    newDiv.style.position = 'sticky';
    newDiv.style.top = '0';
    newDiv.style.left = '0';
    newDiv.style.width = '100%';
    newDiv.style.height = '15vh';
    newDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
    newDiv.style.zIndex = '9999';
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

      // Agregar elementos al DOM
      container.appendChild(leftDiv);
      container.appendChild(mainContentDiv);
      mainContentDiv.appendChild(newDiv);

     // Crear un div para el contenido principal debajo del banner
     const contentDiv = document.createElement('div');
     contentDiv.style.padding = '20px';
     contentDiv.style.marginTop = '15vh';
     mainContentDiv.appendChild(contentDiv);

      // Añadir el contenedor al body
    if (document.body) {
      document.body.appendChild(container);
    } else {
      document.documentElement.appendChild(container);
    }

    console.log('Estructura inyectada correctamente');
      
    

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
    newLink.style.display = 'block';
    newLink.style.padding = '5px 10px';
    newLink.style.textDecoration = 'none';
    
    // Asegúrate de que el target sea 'left', que es el name del iframe
    newLink.target = 'left';

    // Opcionalmente, puedes añadir un manejador de clics si necesitas hacer algo adicional
    newLink.onclick = function(e) {
        // Si necesitas hacer algo adicional al hacer clic, hazlo aquí
        console.log('Clic en enlace:', this.href);
    };

    insertionPoint.appendChild(newLink);
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
    //extractLeftBar();
    extractSiaseData();
    //setBodyBackground();
    
    console.log('Removiendo frames...');

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
