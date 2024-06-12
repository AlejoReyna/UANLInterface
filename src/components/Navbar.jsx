import React from 'react';
import './Navbar.css';
import logoExcelencia from './img/logo-excelencia.png';
import uanlLogo from './img/uanl.png';
import aniversary from './img/90-aniversario.png';

const Navbar = () => {
    return (
    <nav className="navbar">
        <div className="container-fluid">
           <div className='row'>
                <div className='col-6 d-flex align-items-center left-side'>
                    <img src={uanlLogo} className='uanlLogo' alt="Logo de la Universidad Autónoma de Nuevo León"/>
                    <div class="linea-vertical"></div>
                    <h1 className="name mt-2"> UNIVERSIDAD AUTÓNOMA DE NUEVO LEÓN </h1>

                </div>
                
                <div className='col-6 d-flex'>
                    <img src={aniversary} className="logoExcelencia" alt="Logo from aniversary"/>
                    <img src={logoExcelencia} className='logoExcelencia' alt="La excelencia por principio, la educación como instrumento"/>
                </div>
           </div>

           {/** Second row */}
           
        </div>
        
        <div className='container-fluid'>
            <div className='row sub-row w-100 mt-1 '>
                <p className='d-flex justify-content-center ' > Sistema Integral para la Administración de los Servicios Educativos </p>
            </div>
        </div>
    </nav>
    );
};

export default Navbar;