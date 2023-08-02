import {useContext,useEffect,useState} from 'react';

import EventTypeContext from '../context/EventTypeContext';
import Event from './Event';
import '../styles/Event.scss'

const EventList = () => {
    const [events,setEvents] = useState([]);
    const {eventType} = useContext(EventTypeContext);
    const getData = async () => {
        try{
            const url  = new URL('https://api.euskadi.eus/culture/events/v1.0/events/upcoming');
            if (eventType !== "all") {
                url.searchParams.set('type',eventType);
            }
            const response = await fetch(url.toString());
            const data = await response.json();
            console.log(data);
            setEvents(data.items);
        }
        catch(error){
            console.log(error);
        }
    };
    useEffect( () => {
        getData();
    },[eventType]);

    return (
        <section className="event-list">
            {events.map( (event) => (
                <Event event={event} key={event.id} />
            ))}
        </section>
    )

}

export default EventList;