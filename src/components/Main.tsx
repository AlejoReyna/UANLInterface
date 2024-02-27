import React from 'react';
import './Main.css';
import correoImg from './img/correo.png';
import siaseImg from './img/siase.png';
import codiceImg from './img/codice.png';
import nexusImg from './img/nexus.png';

const Main: React.FC = () => {
    return(
        <main>
        <div className="container-fluid body">
        <div className="container">
          <div className="row">
            <ul className="col-6 logo-list">
              <li><img src={correoImg} style={{ width: "40%" }} alt="Correo Universitario" /></li>
              <li><img src={siaseImg} style={{ width: "40%" }} alt="Logo de Siase"/></li>
            </ul>
            <ul className="col-6 logo-list">
              <li><img src={codiceImg} style={{ width: "40%" }} alt="Logo de Codice"/></li>
              <li><img src={nexusImg} style={{ width: "40%" }} alt="Logo de Nexus"/></li>
            </ul>
          </div>
  
          <div className="row" style={{ backgroundColor: "rgba(22, 39, 164, 0.784)", margin: 0, padding: "5px" }}>
            <h4 className="d-flex justify-content-center" id="select-career" style={{ color: "white", alignItems: "center" }}>Seleccione su carrera</h4>
          </div>
  
          <div className="careers">
            <ul>
              <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
              <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
            </ul>
          </div>
        </div>
      </div>
      </main>
  
    );
};

export default Main;