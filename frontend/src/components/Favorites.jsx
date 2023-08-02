import {useContext,useEffect,useState} from 'react';


import Event from './Event';
import FavoritesContext from '../context/FavoritesContext';
import '../styles/Event.scss';

const Favorites = () => {
    const [events,setEvents] = useState([]);
    const {favorites} = useContext(FavoritesContext);

    const getData = async () => {
        setEvents(favorites);
    };
    
    useEffect( () => {
        getData();
    },[favorites]);

    return (
        <section className="event-list">
            {events.map( (event) => (
                <Event event={event} key={event.id} />
            ))}
        </section>
    )

}

export default Favorites;