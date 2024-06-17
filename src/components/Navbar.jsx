import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logoExcelencia from './img/logo-excelencia.png';
import uanlLogo from './img/uanl.png';
import aniversary from './img/90-aniversario.png';

const Navbar = () => {
    

    return (
    <nav className="navbar p-0 ">
        
        {/** First navbar container */}
        <div className="container-fluid d-flex justify-content-center first-navbar">
           
          <div className='row align-items-center w-100 pt-2 pb-2'>

                {/** UANL logo container */}
                <div className='col d-flex uanl-logo-container'>
                    <img src={uanlLogo} className='uanlLogo img-fluid' alt="Logo de la Universidad Autónoma de Nuevo León"/>
                    <div class="linea-vertical mx-3"></div>
                    <h1 className="name mt-2"> UNIVERSIDAD AUTÓNOMA DE NUEVO LEÓN </h1>
                </div>
                {/** End of UANL logo container */}
                
                {/** Aniversary logo container */}
                <div className=' col d-flex justify-content-center'>
                    <img src={aniversary} className="logoExcelencia img-fluid" alt="Logo from aniversary"/>
                </div>
                {/** End of aniversary logo container */}


                {/** Excelence logo container */}
                <div className='col d-flex justify-content-center'>
                    <img src={logoExcelencia} className='logoExcelencia img-fluid' alt="La excelencia por principio, la educación como instrumento"/>
                </div>
                {/** End of excelence logo container */}

          </div>

        </div>
        {/** End of first navbar container */}

        
        {/** "SIASE" Title row */}
        <div className='container-fluid d-flex justify-content-center second-navbar'>
            <div className='row sub-row'>
                <div className='col-12 siase-container'>
                <p className='d-flex justify-content-center mt-3 p-0 siase-container'> SISTEMA INTEGRAL PARA LA ADMINISTRACIÓN DE LOS SERVICIOS EDUCATIVOS </p>
                </div>
            </div>
        </div>
        {/** End of "SIASE" row */}


       
    </nav>
    );
};

export default Navbar;