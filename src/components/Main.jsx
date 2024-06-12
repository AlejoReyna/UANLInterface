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
          <div className="container-fluid background">
            <div className='row'>
              <div className="col-4 menu-bar">
                <div className='row'>
                  <img src={siaseImg} alt='logo de siase' className='menu-item'  onClick={() => handleServiceClick('siase')}/>
                  <hr></hr>
                  <img src={correoImg} alt='logo de siase' className='menu-item' onClick={() => handleServiceClick('correo')}/>
                  <hr></hr>
                  <img src={codiceImg} alt='logo de siase' className='menu-item' onClick={() => handleServiceClick('codice')}/>
                  <hr></hr>
                  <img src={nexusImg} alt='logo de siase' className='menu-item' onClick={() => handleServiceClick('nexus')}/>
                  <hr></hr>




                </div>
              </div>

              <div className="col-8">
              {selectedService === 'siase' && (
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">SIASE</h5>
                  <p className="card-text">Listado de carreras </p>
                </div>
              </div>
            )}
            {selectedService === 'correo' && (
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Correo</h5>
                  <p className="card-text">Servicio de correo electrónico para universitarios, cuenta con Agenda, Contactos, Tareas, Notas y Mensajeria instantanea. Para acceder a este servicio solo necesitas una computadora con acceso a Internet, y utilizar la misma contraseña que utilizas en el SIASE. </p>
                </div>
              </div>
            )}
              </div>
            </div>
          </div>
      </main>
  
    );
};

export default Main;