console.log('Content script running');

document.body.style.backgroundImage = "url('chrome-extension://" + chrome.runtime.id + "/img/uanl-bg.png')";
document.body.classList.add('background');

function injectBootstrap() {
    return new Promise((resolve) => {
        const link = document.createElement('link');
        link.href = chrome.runtime.getURL('lib/css/bootstrap.min.css');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        document.head.appendChild(link);

        const script = document.createElement('script');
        script.src = chrome.runtime.getURL('lib/js/bootstrap.bundle.min.js');
        script.onload = function() {
            this.remove();
            resolve();
        };
        (document.head || document.documentElement).appendChild(script);
    });
}

function createNavbar() {
    const newNavbar = document.createElement('nav');
    newNavbar.className = 'navbar p-0';
    newNavbar.innerHTML = `
       <div class="container-fluid first-navbar">
            <div class='row align-items-center w-100 pt-2 pb-2'>
                <div class='col uanl-logo-container'>
                    <img src="${chrome.runtime.getURL('img/uanlLogo.png')}" class='uanlLogo img-fluid' alt="Logo de la Universidad Autónoma de Nuevo León"/>
                    <div class="linea-vertical mx-3"></div>
                    <h1 class="name mt-2"> UNIVERSIDAD AUTÓNOMA DE NUEVO LEÓN </h1>
                </div>
                <div class='col nav-item'>
                    <img src="${chrome.runtime.getURL('img/aniversary.png')}" class="logoExcelencia img-fluid" alt="Logo from aniversary"/>
                </div>
                <div class='col nav-item'>
                    <img src="${chrome.runtime.getURL('img/logoExcelencia.png')}" class='logoExcelencia img-fluid' alt="La excelencia por principio, la educación como instrumento"/>
                </div>
            </div>
        </div>
        <div class='container-fluid nav-i second-navbar'>
            <div class='row sub-row'>
                <div class='col-12 siase-container'>
                    <p class=' mt-3 p-0 siase-container'> SISTEMA INTEGRAL PARA LA ADMINISTRACIÓN DE LOS SERVICIOS EDUCATIVOS </p>
                </div>
            </div>
        </div>
    `;
    return newNavbar;
}

function createContent() {
    const content = document.createElement('div');
    content.className = 'container-fluid background p-0';
    content.innerHTML = `
        <div class='row third-row w-100 m-0'>
            <div class='col-3 p-0'>
                <div class='menu-element w-100'>
                    <img src="${chrome.runtime.getURL('img/siaseImg.png')}" alt='logo de siase' class='menu-item' data-service='siase'/>               
                </div>
            </div>
            <div class='col-3 p-0'>
                <div class='menu-element w-100'>
                    <img src="${chrome.runtime.getURL('img/correoImg.png')}" alt='logo de correo' class='menu-item' data-service='correo'/>
                </div>
            </div>
            <div class='col-3 p-0'>
                <div class='menu-element w-100'>
                    <img src="${chrome.runtime.getURL('img/codiceImg.png')}" alt='logo de codice' class='menu-item' data-service='codice'/>
                </div>
            </div>
            <div class='col-3 p-0'>
                <div class='menu-element w-100'>
                    <img src="${chrome.runtime.getURL('img/nexusImg.png')}" alt='logo de nexus' class='menu-item' data-service='nexus'/>
                </div>
            </div>
        </div>

       <div class='container page-container'>
            <div id='siase-content' style='display: none;'>
                <h2 class='text-center page-title'>Seleccione la carrera</h2>
                <div id='carreras-list'> </div>
                <div class='d-flex justify-content-center'>
                    <button class='siase-btn'>Salir</button>
                </div>
            </div>

            <div id='correo-content' style='display: none;'>
                <h4 class='barra page-title'>Correo electrónico universitario</h4>
                <p>Servicio de correo electrónico para universitarios, cuenta con Agenda, Contactos, Tareas, Notas y Mensajeria instantanea. Para acceder a este servicio solo necesitas una computadora con acceso a Internet, y utilizar la misma contraseña que utilizas en el SIASE.</p>
                <div class='d-flex justify-content-center'>
                    <button class='siase-btn'>Ingresar</button>
                </div>
            </div>

            <div id='codice-content' style='display: none;'>
                <h4 class='barra page-title'>Codice</h4>
                <p>Es el Sistema Institucional para la Administración de Bibliotecas donde se encuentran registrados todos los materiales (libros, revistas, CDs, etc.) que existen físicamente en las bibliotecas de nuestra Universidad*, y en este se lleva el control de los préstamos de los materiales y otros procesos propios de las bibliotecas. Para acceder a este servicio y consultar tus préstamos pendientes de devolver, así como las multas pendientes de pagar, puedes hacerlo desde el siguiente botón:</p>
                <div class='d-flex justify-content-center'>
                    <button class='siase-btn'>Ingresar</button>
                </div>
                <p>* Excepto bibliotecas de administración central: Capilla Alfonsina Biblioteca Universitaria, Biblioteca Universitaria Raúl Rangel Frías y Biblioteca de Ciencias Agropecuarias y Biológicas.</p>
            </div>

            <div id='nexus-content' style='display: none;'>
                <h4 class='barra page-title'>Nexus</h4>
                <p>Es una plataforma que facilita la colaboración entre alumnos y maestros en el proceso de enseñanza y aprendizaje, en sus modalidades presencial, a distancia y mixto.</p>
                <div class='d-flex justify-content-center'>
                    <button class='siase-btn'>Ingresar</button>
                </div>
            </div>
        </div>

        <br>
        <div class='row'>
            <div class='col-2'></div>
            <div class='col-8 last-text-container p-3'>
                <p class='last-text'>Si no aparece tu información en el Listado de Carreras favor de revisar en tu dependencia las fechas de liberación de tu Boleta.</p>
            </div>
        </div>
    `;

    return content;
}

function handleServiceClick(service) {
    document.querySelectorAll('.page-container > div').forEach(div => {
        div.style.display = 'none';
    });
    document.getElementById(`${service}-content`).style.display = 'block';
    document.querySelector('.page-container').classList.add('show');
}

function addEventListeners() {
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function() {
            handleServiceClick(this.dataset.service);
        });
    });
}



function updateDOM() {
    
    const siaseDiv = document.getElementById('siase');
    if (siaseDiv) {

        const carrerasContent = siaseDiv.querySelector('#contenido');
        const newCarrerasContainer = document.createElement('div');
        
        if (carrerasContent) {
            const carrerasLinks = carrerasContent.querySelectorAll('a');
            carrerasLinks.forEach(link => {
                const newLink = document.createElement('a');
                newLink.href = '#';
                newLink.innerHTML = link.innerHTML;
                newLink.setAttribute('data-href', link.href);
                newLink.onclick = function(e) {
                    e.preventDefault();
                    handleCarreraClick(this.getAttribute('data-href'));
                };
                newCarrerasContainer.appendChild(newLink);
                newCarrerasContainer.appendChild(document.createElement('br'));
            });
        }
        
        siaseDiv.parentNode.insertBefore(newCarrerasContainer, siaseDiv.nextSibling);
        siaseDiv.style.display = 'none';
    }

    const nexusDiv = document.getElementById('nexus');
    if (nexusDiv) {
        nexusDiv.style.display = 'none';

    }
    
    const codiceDiv = document.getElementById('codice');
    if (codiceDiv) {
        codiceDiv.style.display = 'none';
    }

    const correoDiv = document.getElementById('correo');
    if (correoDiv) {
        correoDiv.style.display = 'none';

    }

    const bloqueoDiv = document.getElementById('bloqueo');
    if (bloqueoDiv) {
        bloqueoDiv.style.display = 'none';
    }


    const tableElements = document.querySelector(
        'table[width="800"][border="0"][cellspacing="0"][cellpadding="0"][align="center"]'
    );
    
    if (tableElements) {
        siaseDiv.innerHTML = tableElements.innerHTML;

        tableElements.remove();
    }

    const tableInfo = document.querySelector(
        'table[align="center"][class="auto-style1"][style="width: 70%"]'
    );
    if (tableInfo) {
        tableInfo.remove();
    }

    const table = document.querySelector('table[width="600"][border="0"][cellspacing="0"][cellpadding="0"][align="center"]');
    if (table) {
        table.remove();
    }
    

    const newNavbar = createNavbar();
    document.body.insertBefore(newNavbar, document.body.firstChild);

    const newContent = createContent();
    document.body.insertBefore(newContent, document.body.firstChild.nextSibling);
    addEventListeners();
}

function handleCarreraClick(hrefContent) {
    const form = document.querySelector('form[name="SelCarrera"]');
    if (!form) return;

    const params = hrefContent.split('javascript:')[1].split(';');
    params.forEach(param => {
        const [key, value] = param.trim().split('=');
        if (key && value) {
            const inputName = key.split('.').pop().replace(/'/g, '');
            const inputValue = value.replace(/'/g, '');
            const input = form.querySelector(`input[name="${inputName}"]`);
            if (input) input.value = inputValue;
        }
    });
    
    form.submit();
}

async function init() {
    await injectBootstrap();
    updateDOM();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
