import {useContext,useEffect,useState} from 'react';


import Event from './Event';
import FavoritesContext from '../context/FavoritesContext';
import '../styles/Event.scss';

const Favorites = () => {
    const [events,setEvents] = useState([]);
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const {favorites} = useContext(FavoritesContext);

    const getData = async () => {
        setEvents(favorites);
    };
    
    useEffect( () => {
        getData();
        const token = localStorage.getItem('token');
        if(token) {
            setIsLoggedIn(true);
        }
    },[favorites]);

    return (
        <section className="event-list">
            {isLoggedIn && events.length === 0 && <p>No tienes eventos favoritos</p>}
            {!isLoggedIn && <p>Debes estar registrado para ver tus eventos favoritos</p>}
            {events.map( (event) => (
                <Event event={event} key={event.id} />
            ))}
        </section>
    )

}

export default Favorites;