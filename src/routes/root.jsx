import { Outlet,Link } from "react-router-dom";
import { useState,useRef } from "react";
import IdiomaContext from '../context/idiomaContext';

const Root = () => {
    const [idioma, setIdioma] = useState('es');
    const buttonRef = useRef(null);
    const cambiarIdioma = () => {
        if (idioma === 'es') {
          setIdioma('eu');
          buttonRef.current.innerText = 'Castellano';
        } else {
          setIdioma('es');
          buttonRef.current.innerText = 'Euskara';
        }
      }
    return (
        <IdiomaContext.Provider value={idioma}>
            <header>
                <nav>
                    <button className="idioma button-75" ref={buttonRef} onClick={cambiarIdioma}>Euskara</button>
                    <ul>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/favorites">Favoritos</Link></li>
                    </ul>
                </nav>
            </header>
                <h1>{idioma ==="es"? "Eventos": "Ekitaldiak"}</h1>
                
                <section id="upcoming-events">
                    <Outlet />
                </section>
        </IdiomaContext.Provider>
    );
};

export default Root;