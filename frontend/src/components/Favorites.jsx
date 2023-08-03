import {useContext} from 'react';


import Event from './Event';
import FavoritesContext from '../context/FavoritesContext';
import LoggedInContext from '../context/loggedInContext';

import '../styles/Event.scss';

const Favorites = () => {
    const {isLoggedIn} = useContext(LoggedInContext);
    const {favorites} = useContext(FavoritesContext);

    return (
        <section className="event-list">
            {isLoggedIn && favorites.length === 0 && <p>No tienes eventos favoritos</p>}
            {!isLoggedIn && <p>Debes estar registrado para ver tus eventos favoritos</p>}
            {favorites.map( (event) => (
                <Event event={event} key={event.id} />
            ))}
        </section>
    )

}

export default Favorites;