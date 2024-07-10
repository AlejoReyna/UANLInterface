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

