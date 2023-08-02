import {useContext, useEffect,useState} from 'react';

import IdiomaContext from "../context/idiomaContext";
import FavoritesContext from '../context/FavoritesContext';

const Event = ({event}) => {
    const [isFavorite,setIsFavorite] = useState(false);
    const idioma = useContext(IdiomaContext);
    const {favorites,getFavoritesApi} = useContext(FavoritesContext);
    const image  = event.images.length ? event.images[0].imageUrl: "https://via.placeholder.com/150";
    const saveFavorite = async () => {
        if(isFavorite) {
            await deleteFavoriteApi();
        }
        else {
            await saveFavoriteApi();
        }
        getFavoritesApi();
    }
    const saveFavoriteApi = async() => {
        try {
            const response  = await fetch('http://localhost:3333/favorites',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "event":event
                })

            });
            console.log(response);
            setIsFavorite(true);
        } catch (error) {
            
        }
    }

    const deleteFavoriteApi = async() => {
        try {
            const response  = await fetch(`http://localhost:3333/favorites/${event._id}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response);
            setIsFavorite(false);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect( () => {
        const isFavorite = favorites.find( (favorite) => favorite.id === event.id);
        if (isFavorite) {
            setIsFavorite(true);
        }
    },[]);

    useEffect( () => {
        
    },[isFavorite]);

    return (
        <div className="event">
            <img src={image} alt={event.nameEs} />
            <h3>{idioma === "es" ? event.nameEs : event.nameEu}</h3>
            <p>{event.date}</p>
            <article dangerouslySetInnerHTML={{__html: idioma === "es" ? event.descriptionEs : event.descriptionEu}}></article>
            <button className="button-75" onClick={saveFavorite}>{isFavorite ? "Eliminar" : "Guardar"}</button>
        </div>
    )
}

export default Event;