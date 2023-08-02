import {useContext, useEffect,useState} from 'react';

import IdiomaContext from "../context/idiomaContext";

const Event = ({event,onChange}) => {
    const [isFavorite,setIsFavorite] = useState(false);
    const idioma = useContext(IdiomaContext);
    const image  = event.images.length ? event.images[0].imageUrl: "https://via.placeholder.com/150";
    const saveFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (isFavorite) {
            const index = favorites.findIndex( (favorite) => favorite.id === event.id);
            favorites.splice(index,1);
            localStorage.setItem('favorites',JSON.stringify(favorites));
            setIsFavorite(false);
            return;
        }
        if (favorites.find( (favorite) => favorite.id === event.id)) {
            return;
        }
        favorites.push(event);
        localStorage.setItem('favorites',JSON.stringify(favorites));
        setIsFavorite(true);
    }
    useEffect( () => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setIsFavorite(favorites.find( (favorite) => favorite.id === event.id));
    },[]);

    useEffect( () => {
        if(onChange) onChange();
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