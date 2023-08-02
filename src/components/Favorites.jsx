import {useContext,useEffect,useState} from 'react';


import Event from './Event';
import '../styles/Event.scss'

const Favorites = () => {
    const [events,setEvents] = useState([]);
    const getData = async () => {
        const favorites = JSON.parse(localStorage.getItem('favorites'));
        if (favorites === null || favorites.length === 0) {
            setEvents([]);
            return;
        }
        setEvents(favorites);
    };
    useEffect( () => {
        getData();
    },[]);

    return (
        <section className="event-list">
            {events.map( (event) => (
                <Event event={event} key={event.id} onChange={getData}/>
            ))}
        </section>
    )

}

export default Favorites;