console.log('Script inyectado correctamente');
let extractedSiaseData = null;
let extractedTd18 = null;
let extractedbarraHeader = null;

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

    if (elementsBar) {
        extractedbarraHeader = elementsBar.cloneNode(true);
        console.log('Elemento barraHeader extraído correctamente');
      } else {
        console.log('No se encontró el elemento barraHeader en el frame top');
      }
  } else {
    console.log('No se encontró el frame top o no se puede acceder a su contenido');
  }
}

function injectDiv() {
  if (window.location.href === "https://deimos.dgi.uanl.mx/cgi-bin/wspd_cgi.sh/default.htm") {
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

    if (document.body) {
      document.body.appendChild(newDiv);
    } else {
      document.documentElement.appendChild(newDiv);
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

function init() {
  extractSiaseData();
  
  // Remover frames después de extraer la información
  const topFrame = document.querySelector('frame[name="top"]');
  if (topFrame) topFrame.remove();
  const frameset = document.querySelector('frameset[cols="184,*"]');
  if (frameset) frameset.remove();
  const lastframeset = document.querySelector('frameset[rows="110,*"]');
  if (lastframeset) lastframeset.remove();
  
  injectDiv();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

const barraContent = document.getElementById('barraContent');
console.log('Elemento barraContent:', barraContent);
