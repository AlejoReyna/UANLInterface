// Constants and global variables
const MAIN_PAGE_URL = "https://deimos.dgi.uanl.mx/cgi-bin/wspd_cgi.sh/default.htm";
let extractedSiaseData = null;
let extractedUserData = null;
let extractedHeaderBar = null;
// let extractedLeftBar = null;

// Data extraction functions
function extractLeftBar() {
    console.log('Starting extractLeftBar()');
    const leftFrame = document.querySelector('frame[name="left"]');
    if (!leftFrame || !leftFrame.contentDocument) {
        console.log('Left frame not found or content inaccessible');
        return;
    }

    const leftBar = leftFrame.contentDocument.querySelector('ul.menu.collapsible');
    if (leftBar) {
        extractedLeftBar = leftBar.cloneNode(true);
        console.log('Collapsible menu extracted successfully');
        addEventListenersToLinks(extractedLeftBar);
    } else {
        extractAlternativeContent(leftFrame);
    }
}

function extractAlternativeContent(leftFrame) {
    console.log('ul.menu.collapsible not found. Searching for alternatives...');
    const anyUl = leftFrame.contentDocument.querySelector('ul');
    if (anyUl) {
        extractedLeftBar = anyUl.cloneNode(true);
        console.log('Alternative ul extracted');
    } else {
        const bodyContent = leftFrame.contentDocument.body;
        if (bodyContent) {
            extractedLeftBar = bodyContent.cloneNode(true);
            console.log('Body content extracted as alternative');
        } else {
            console.log('Failed to extract even the body content');
        }
    }
}

function extractSiaseData() {
    const topFrame = document.querySelector('frame[name="top"]');
    if (!topFrame || !topFrame.contentDocument) {
        console.log('Top frame not found or content inaccessible');
        return;
    }

    const siaseData = topFrame.contentDocument.querySelector('td[width="5%"][rowspan="2"][align="right"]');
    const userData = topFrame.contentDocument.querySelector('td[width="18%"]');
    const headerBar = topFrame.contentDocument.querySelector('td[bgcolor="#094988"][colspan="3"]');

    if (headerBar) {
        extractedHeaderBar = headerBar.cloneNode(true);
        console.log('Header bar extracted successfully');
        console.log('Number of links in header bar:', extractedHeaderBar.querySelectorAll('a').length);
        console.log('Header bar HTML:', extractedHeaderBar.innerHTML);
    }

    if (siaseData) {
        extractedSiaseData = siaseData.cloneNode(true);
        console.log('SIASE data extracted successfully');
    } else {
        console.log('SIASE data element not found in top frame');
    }

    if (userData) {
        extractedUserData = userData.cloneNode(true);
        console.log('User data element extracted successfully');

        const userDataContent = userData.innerHTML;
        const matriculaMatch = userDataContent.match(/Matrícula<\/span>:\s*(\d+)/);
        const nombreMatch = userDataContent.match(/Nombre<\/strong>:\s*([^<]+)/);

        if (matriculaMatch && matriculaMatch[1]) {
            const matricula = matriculaMatch[1];
            console.log('Matrícula extraída:', matricula);
        }

        if (nombreMatch && nombreMatch[1]) {
            const nombre = nombreMatch[1].trim();
            console.log('Nombre extraído:', nombre);
        }
    } else {
        console.log('User data element not found in top frame');
    }
}

// DOM creation functions
function createMainContainer() {
    const container = document.createElement('div');
    container.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    z-index: 9997;
    background-size: cover;
  `;
    return container;
}

function createMainContentDiv() {
    const mainContentDiv = document.createElement('div');
    mainContentDiv.id = 'mainContent';
    mainContentDiv.style.cssText = `
    width: 80%;
    height: 100vh;
    display: flex;
    flex-direction: column;
  `;
    mainContentDiv.innerHTML = `
    <div id="mainBanner" style="flex-shrink: 0;"></div>
    <div style="flex-grow: 1; overflow-y: auto;">
      <div id="originalMainContent"> </div>
      <iframe id="centerFrame" name="center" style="width: 100%; height: 100%; border: none;"></iframe>
    </div>
  `;
    return mainContentDiv;
}

// Aquí va el contenido
function createBanner() {
    const banner = document.createElement('div');
    banner.style.cssText = `
    width: 100%;
    z-index: 9999;
    color: #bd995c;
    top: 0;
  `;
    banner.innerHTML = `
    <div class="row siase-navbar">
      <div class="col-12"></div>
    </div>
    <div class="row">
      <div class="col-12">
        <div id="siaseData-content">
          <div class='d-flex justify-content-center'>
            <div id="userData-content"> Bienvenido:  </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div id='barraContent'></div>
      texto
    </div>
  `;
    return banner;
}

function createContentDiv() {
    return document.createElement('div');
}

function createLeftDiv() {
    const leftDiv = document.createElement('div');
    leftDiv.style.cssText = `
    width: 30%;
    height: 100%;
    background-color: #054FA7;
    box-shadow: 2px 0 5px rgba(0,0,0,0.1);
    z-index: 9998;
  `;

    const banner = createBanner();
    leftDiv.appendChild(banner);

    leftDiv.innerHTML += `
    <div id="leftBar-content" style="padding: 20px;">
      <div class="here"></div>
    </div>
    <iframe 
      id="leftFrame"
      name="left"
      style="width: 100%; height: calc(100% - 20px); border: none;">
    </iframe>
  `;

    const iframe = leftDiv.querySelector('#leftFrame');
    iframe.onload = function() {
        try {
            const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
            const iframeBody = iframeDocument.body;
            const iframeAnchors = iframeDocument.getElementsByTagName('a');
            const iframeLi = iframeDocument.getElementsByTagName('li');

            styleIframeElements(iframeDocument, iframeBody, iframeAnchors, iframeLi);
        } catch (error) {
            console.error('Error accessing iframe content:', error);
        }
    };

    return leftDiv;
}

// DOM insertion functions
function injectDiv() {
    if (window.location.href !== MAIN_PAGE_URL) {
        console.log('Div not injected because we are not on the correct page');
        return;
    }

    const container = createMainContainer();
    const leftDiv = createLeftDiv();
    const mainContentDiv = createMainContentDiv();

    container.appendChild(leftDiv);
    container.appendChild(mainContentDiv);

    const contentDiv = createContentDiv();
    mainContentDiv.appendChild(contentDiv);

    appendToBody(container);
    console.log('Structure injected successfully');

    insertExtractedData();
}

function insertExtractedData() {
    insertSiaseData(); // <- Esta cosa trae la foto
    insertLeftBar();
   // insertUserData();
    insertHeaderBar();
}

function insertSiaseData() {
    const siaseContent = document.getElementById('siaseData-content');
    if (siaseContent) {
        const imgElement = siaseContent.querySelector('img');
        if (imgElement) {
            // Aplicar estilos para hacer la imagen redonda
            imgElement.style.borderRadius = '50%';
            imgElement.style.objectFit = 'cover';
            imgElement.style.width = '100px'; // Ajusta según necesites
            imgElement.style.height = '100px'; // Ajusta según necesites
            console.log('Image style updated to circular');
        } else {
            console.log('Image element not found');
        }
    } else {
        console.log('siaseData-content element not found');
    }
}

function insertLeftBar() {
    if (extractedLeftBar) {
        const leftBarContent = document.getElementById('leftBar-content');
        if (leftBarContent) {
            leftBarContent.appendChild(extractedLeftBar);
            console.log('Left bar element inserted successfully');
        }
    } else {
        console.log('No extracted content for left bar');
    }
}


function insertUserData() {
    if (extractedUserData) {
        const userDataContent = document.getElementById('siaseData-content');
        if (userDataContent) {
            userDataContent.appendChild(extractedUserData);
            console.log('User data element inserted successfully');
        }
    }
}

function insertHeaderBar() {

    if (extractedHeaderBar) {
        const barraContent = document.getElementById('barraContent');
        if (barraContent) {
            barraContent.innerHTML = '';
            const links = extractedHeaderBar.querySelectorAll('a');
            links.forEach((link, index) => {
                const newLink = createStyledLink(link);
                const insertionPoint = document.querySelector('#leftBar-content .here');
                if (insertionPoint) {
                    styleInsertionPointAnchors(insertionPoint);
                    insertionPoint.appendChild(newLink);
                    console.log(`Link ${index + 1} inserted:`, newLink.outerHTML);
                }
            });
            console.log('All links inserted and styled');
        } else {
            console.log('Element with id "barraContent" not found');
        }
    } else {
        console.log('No extracted content for header bar');
    }

}

// Styling functions
function createStyledLink(link) {
    const newLink = link.cloneNode(true);
    newLink.style.cssText = `
    display: block;
    padding: 10px 10px;
    text-decoration: none;
  `;
    newLink.target = 'left';
    newLink.onclick = (event) => handleLinkClick(event, newLink);
    return newLink;
}

function styleIframeElements(iframeDocument, iframeBody, iframeAnchors, iframeLi) {

    if (iframeLi.length > 0) {
        const style = iframeDocument.createElement('style');
        style.textContent = 'li { border-bottom: none !important; }';
        iframeDocument.head.appendChild(style);
        Array.from(iframeLi).forEach(li => li.style.removeProperty('border-bottom'));
        console.log('Border bottom removed successfully');
    } else {
        console.log('No li elements found in the iframe');
    }

    if (iframeAnchors.length > 0) {
        const style = iframeDocument.createElement('style');
        style.textContent = 'a { background: none !important; background-color: transparent !important; }';
        iframeDocument.head.appendChild(style);
        Array.from(iframeAnchors).forEach(anchor => {
            anchor.removeAttribute('background');
            anchor.style.removeProperty('background');
            anchor.style.removeProperty('background-color');
            // anchor.style.color = '#bd995c';
        });
        console.log('Anchor background removed successfully');
    } else {
        console.log('No anchors found in the iframe');
    }

    if (iframeBody) {
        iframeBody.removeAttribute('bgcolor');
        const style = iframeDocument.createElement('style');
        iframeDocument.head.appendChild(style);
        iframeBody.style.padding = '5px 10px';
    }
}

function styleInsertionPointAnchors(insertionPoint) {
    const anchors = insertionPoint.querySelectorAll('a');
    Array.from(anchors).forEach(anchor => {
        anchor.style.setProperty('color', '#bd995c', 'important');
    });
}

// Event handlers
function handleLinkClick(event, link) {
    // Implement link click handling logic
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
            console.error('Error loading content:', error);
        });
}

// Utility functions
function addEventListenersToLinks(element) {
    const links = element.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', handleLinkClick);
    });
}

function appendToBody(element) {
    if (document.body) {
        document.body.appendChild(element);
    } else {
        document.documentElement.appendChild(element);
    }
}

// Initialization
function init() {
    console.log('Starting content extraction...');
    extractSiaseData();
    extractLeftBar();

    console.log('Removing frames...');
    const lastFrameset = document.querySelector('frameset[rows="110,*"]');
    if (lastFrameset) lastFrameset.remove();

    console.log('Injecting new content...');
    injectDiv();
}

// Event listeners
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Execute
console.log('Script injected successfully');