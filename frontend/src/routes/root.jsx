import { Outlet,Link } from "react-router-dom";
import { useState,useRef,useEffect } from "react";
import IdiomaContext from '../context/idiomaContext';
import FavoritesContext from "../context/FavoritesContext";
import LoggedInContext from "../context/loggedInContext";

import '../styles/Navbar.scss';


const Root = () => {
    const [idioma, setIdioma] = useState('es');
    const [favorites, setFavorites] = useState([]);
    const [isLoggedIn,setIsLoggedIn] = useState(false);
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
        console.log("get favorites");
        try {
            const token = localStorage.getItem('token');
            if(!token){
                setFavorites([]);
                setIsLoggedIn(false);
                return;
            }
            const response = await fetch('http://localhost:3333/api/events/favorites',{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if(response.status === 401) {
                setFavorites([]);
                setIsLoggedIn(false);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                return;
            }
            let data = await response.json();
            data = data.map( (favorite) => {
                const event = favorite.event;
                event._id = favorite._id;
                return event;
            });
            console.log(data);
            setFavorites(data);
        } catch (error) {
            setFavorites([]);
            console.error(error);
        }
    }

    useEffect( () => {
        getFavoritesApi();
        const token = localStorage.getItem('token');
        if(token) {
            setIsLoggedIn(true);
        }
    },[]);

    useEffect( () => {
        console.log("isLoggedIn",isLoggedIn)
        getFavoritesApi();
    },[isLoggedIn]);
    

    return (
        <IdiomaContext.Provider value={idioma}>
            <FavoritesContext.Provider value={{favorites,getFavoritesApi}}>
                <LoggedInContext.Provider value={{isLoggedIn,setIsLoggedIn}}>
                <header>
                    <nav>
                        
                        <ul>
                            <li><Link to="/">Inicio</Link></li>
                            <li><Link to="/favorites">Favoritos</Link></li>
                            {!isLoggedIn ?
                            <>
                                <li><Link to="/register">Registrarse</Link></li>
                                <li><Link to="/login">Iniciar sesión</Link></li>
                            </>
                            :
                            <li><Link to="/logout">Cerrar sesión</Link></li>
                            }
                        </ul>
                        <button className="idioma button-75" ref={buttonRef} onClick={cambiarIdioma}>Euskara</button>
                    </nav>
                </header>
                <main>
                    <h1>{idioma ==="es"? "Eventos": "Ekitaldiak"}</h1>
                    
                    <section id="upcoming-events">
                        <Outlet />
                    </section>
                </main>
                </LoggedInContext.Provider>
            </FavoritesContext.Provider>
        </IdiomaContext.Provider>
    );
};

export default Root;