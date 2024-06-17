import React, {useState} from 'react';
import './Main.css';
import correoImg from './img/correo.png';
import siaseImg from './img/siase.png';
import codiceImg from './img/codice1.png';
import nexusImg from './img/nexus.png';

const Main = () => {

  const [selectedService, setSelectedService] = useState(null);

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

    return(
        <main>
           
          <div className='container-fluid background p-0'>
            <div className='row third-row w-100 m-0'>
                <div className='col-3 p-0'>
                  <div className='menu-element w-100'>
                <img src={siaseImg} alt='logo de siase' className='menu-item'  onClick={() => handleServiceClick('siase')}/>               
                  </div>
                </div>
                <div className='col-3 p-0'>
                  <div className='menu-element w-100'>
                    <img src={correoImg} alt='logo de siase' className='menu-item' onClick={() => handleServiceClick('correo')}/>
                  </div>
                </div>
                <div className='col-3 p-0'>
                  <div className='menu-element w-100'>
                    <img src={codiceImg} alt='logo de siase' className='menu-item' onClick={() => handleServiceClick('codice')}/>
                  </div>
                </div>
                <div className='col-3 p-0'>
                  <div className='menu-element w-100'>
                    <img src={nexusImg} alt='logo de siase' className='menu-item' onClick={() => handleServiceClick('nexus')}/>
                  </div>
                </div>
            </div>
   

          <div className={`container page-container ${selectedService ? 'show' : ''}`}>
            {selectedService === 'siase' &&
            <div>
              <h2 className='text-center page-title'> Seleccione la carrera </h2>
               <h4 className='barra page-title'>Listado de carrera</h4>
               <p> FACULTAD DE INGENIERÍA MECÁNICA Y ELÉCTRICA - INGENIERO EN TECNOLOGIA DE SOFTWARE </p>
              <div className='d-flex justify-content-center'>
               <button className='siase-btn'> Salir </button>
              </div>

            </div>}

            {selectedService === 'correo' &&
            <div>
             <h4 className='barra page-title'>Correo electrónico universitario</h4>
             <p> Servicio de correo electrónico para universitarios, cuenta con Agenda, Contactos, Tareas, Notas y Mensajeria instantanea. Para acceder a este servicio solo necesitas una computadora con acceso a Internet, y utilizar la misma contraseña que utilizas en el SIASE. </p>
             <div className='d-flex justify-content-center'>
              <button className='siase-btn'> Ingresar </button>
            </div>

            </div>}

            {selectedService === 'codice' &&
            <div>
             <h4 className='barra page-title'>Codice</h4>
             <p> Es el Sistema Institucional para la Administración de Bibliotecas donde se encuentran registrados todos los materiales (libros, revistas, CDs, etc.) que existen físicamente en las bibliotecas de nuestra Universidad*, y en este se lleva el control de los préstamos de los materiales y otros procesos propios de las bibliotecas. Para acceder a este servicio y consultar tus préstamos pendientes de devolver, así como las multas pendientes de pagar, puedes hacerlo desde el siguiente botón:
             </p>
             <div className='d-flex justify-content-center'>
             <button className='siase-btn'> Ingresar </button>
             </div>
             <p> * Excepto bibliotecas de administración central: Capilla Alfonsina Biblioteca Universitaria, Biblioteca Universitaria Raúl Rangel Frías y Biblioteca de Ciencias Agropecuarias y Biológicas. </p>


            </div> }
            {selectedService === 'nexus' && 
            <div>
              <h4 className='barra page-title'>Nexus</h4>
              <p> Es una plataforma que facilita la colaboración entre alumnos y maestros en el proceso de enseñanza y aprendizaje, en sus modalidades presencial, a distancia y mixto.  </p>
            <div className='d-flex justify-content-center'>
              <button className='siase-btn'> Ingresar </button>
            </div>
            </div>  
            }             </div>  

            <br></br>
            <div className='row'>

              <div className='col-2'></div>
              <div className='col-8 last-text-container p-3'>
                <p className='last-text'> Si no aparece tu información en el Listado de Carreras favor de revisar en tu dependencia las fechas de liberación de tu Boleta. </p>
              </div>
            </div>


           


          
        </div>

        
      </main>
  
    );
};

export default Main;