import { Outlet,Link } from "react-router-dom";
import { useState,useRef,useEffect } from "react";
import IdiomaContext from '../context/idiomaContext';
import FavoritesContext from "../context/FavoritesContext";

const Root = () => {
    const [idioma, setIdioma] = useState('es');
    const [favorites, setFavorites] = useState([]);
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
    const getFavoritesApi = async() => {
        try {
            const response = await fetch('http://localhost:3333/favorites');
            let data = await response.json();
            data = data.map( (favorite) => {
                const event = favorite.event;
                event._id = favorite._id;
                return event;
            });
            console.log(data);
            setFavorites(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect( () => {
        getFavoritesApi();
    },[]);
    

    return (
        <IdiomaContext.Provider value={idioma}>
            <FavoritesContext.Provider value={{favorites,getFavoritesApi}}>
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
            </FavoritesContext.Provider>
        </IdiomaContext.Provider>
    );
};

export default Root;