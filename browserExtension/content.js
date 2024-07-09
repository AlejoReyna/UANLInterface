console.log('Content script running');

document.body.style.backgroundImage = "url('chrome-extension://" + chrome.runtime.id + "/img/uanl-bg.png')";
document.body.classList.add('background');

async function injectBootstrap() {
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


const siaseDiv = document.getElementById('siase');

function updateDOM() {
    
if (siaseDiv) {
    siaseDiv.style.setProperty('position', 'static', 'important');
}


// Select all <td> elements with bgcolor="#000000" and width="1"
const targetElements = document.querySelectorAll('td[bgcolor="#000000"][width="1"]');

targetElements.forEach(element => {
    element.remove();
});

    const correoDiv = document.getElementById('correo');
    if (correoDiv) {
        correoDiv.style.display = 'none';

    }

    const bloqueoDiv = document.getElementById('bloqueo');
    if (bloqueoDiv) {
        bloqueoDiv.style.display = 'none';
    }



    
    
    const fuckingImg = document.querySelector(
        'td[colspan="3"]'
    );

    // This deletes the paragraph with class "titulo"
const tituloElement = document.querySelector('.titulo');

if (tituloElement) {
    tituloElement.remove();
}
    




    // 
    // This deletes the services images
    const fuckingElements = document.querySelector(
        'td[width="251"]'
    );

    if(fuckingElements) {
        fuckingElements.remove();
    }
    // 
    //

    if(fuckingImg){
        fuckingImg.remove();
    }

    // Ugly table from above 
    const tableInfo = document.querySelector(
        'table[align="center"][class="auto-style1"][style="width: 70%"]'
    );
    if (tableInfo) {
        tableInfo.remove();
    }
    
    // Ugly header
    const table = document.querySelector('table[width="600"][border="0"][cellspacing="0"][cellpadding="0"][align="center"]');
    if (table) {
        table.remove();
    }
    
const newNavbar = createNavbar();
document.body.insertBefore(newNavbar, document.body.firstChild);

const newContent = createContent();
document.body.insertBefore(newContent, document.body.firstChild.nextSibling);
addEventListeners();

moveTable(); // Mueve y oculta la tabla
moveNexusForm();
moveCodiceForm();
}
    
const content = document.createElement('div');

function createContent() {
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
                <div id='carreras-list'>  </div>
                
            </div>

            <div id='correo-content' style='display: none;'>
                <h4 class='barra page-title'>Correo electrónico universitario</h4>
                <p>Servicio de correo electrónico para universitarios, cuenta con Agenda, Contactos, Tareas, Notas y Mensajeria instantanea. Para acceder a este servicio solo necesitas una computadora con acceso a Internet, y utilizar la misma contraseña que utilizas en el SIASE.</p>
                <div class='d-flex justify-content-center'>
                <a href="https://login.microsoftonline.com/?whr=uanl.edu.mx" class="style3" target="_blank">
                    <button class='siase-btn'>Ingresar</button>
                </a>
                </div>
            </div>

            <div id='codice-content' style='display: none;'>
                <h4 class='barra page-title'>Codice</h4>
                <p>Es el Sistema Institucional para la Administración de Bibliotecas donde se encuentran registrados todos los materiales (libros, revistas, CDs, etc.) que existen físicamente en las bibliotecas de nuestra Universidad*, y en este se lleva el control de los préstamos de los materiales y otros procesos propios de las bibliotecas. Para acceder a este servicio y consultar tus préstamos pendientes de devolver, así como las multas pendientes de pagar, puedes hacerlo desde el siguiente botón:</p>
                <div class='d-flex justify-content-center'>

                </div>
                <p>* Excepto bibliotecas de administración central: Capilla Alfonsina Biblioteca Universitaria, Biblioteca Universitaria Raúl Rangel Frías y Biblioteca de Ciencias Agropecuarias y Biológicas.</p>
            </div>

            <div id='nexus-content' style='display: none;'>
                <h4 class='barra page-title'>Nexus</h4>
                <p>Es una plataforma que facilita la colaboración entre alumnos y maestros en el proceso de enseñanza y aprendizaje, en sus modalidades presencial, a distancia y mixto.</p>
                <div class='d-flex justify-content-center'>
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

    // Nuevo código para el event listener de SIASE
    document.querySelector('[data-service="siase"]').addEventListener('click', function() {
        document.getElementById('siase-content').style.display = 'block';
        const fuckingTable = document.querySelector('#carreras-list > table');
        if (fuckingTable) {
            fuckingTable.style.display = 'table'; // Muestra la tabla
        }
    });

    document.addEventListener('DOMContentLoaded', () => {
        moveNexusForm();
        moveCodiceForm();
    });
}

function moveCodiceForm() {
    const codiceForm = document.querySelector('form[name="frCodice"]');
    if (codiceForm) {
        const codiceContent = document.getElementById('codice-content');
        const targetDiv = codiceContent.querySelector('.d-flex.justify-content-center');
        
        if (targetDiv) {
            targetDiv.appendChild(codiceForm);
            
            // Opcional: Modificar el estilo del botón para que se ajuste a la nueva ubicación
            const button = codiceForm.querySelector('input[type="button"]');
            if (button) {
                button.className = 'btn btn-primary'; // Añade clases de Bootstrap o tus propias clases personalizadas
            }
        }
    }
}

function moveNexusForm() {
    const nexusForm = document.querySelector('form[name="frNexus"]');
    if (nexusForm) {
        const nexusContent = document.getElementById('nexus-content');
        const targetDiv = nexusContent.querySelector('.d-flex.justify-content-center');
        
        if (targetDiv) {
            targetDiv.appendChild(nexusForm);
            
            // Optional: Modify the button style to fit the new location
            const button = nexusForm.querySelector('input[type="button"]');
            if (button) {
                button.className = 'btn btn-primary'; // Add Bootstrap classes or your custom classes
            }
        }
    }
}
// Nueva función para mover la tabla
function moveTable() {
    const fuckingTable = document.querySelector(
        'table[width="800"][border="0"][cellspacing="0"][cellpadding="0"][align="center"]'
    );
    if (fuckingTable) {
        const carrerasList = document.getElementById('carreras-list');
        carrerasList.appendChild(fuckingTable);
        fuckingTable.style.display = 'none'; // Oculta la tabla después de moverla
    }
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