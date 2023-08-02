import {useState, useEffect} from 'react';
import EventType from './EventType';
import '../styles/EventType.scss'

const EventTypeList = () => {
    const [eventTypes, setEventTypes] = useState([]);

    const getData = async () => {
        try{
            const response = await fetch('https://api.euskadi.eus/culture/events/v1.0/eventType');
            let data = await response.json();
            console.log(data);
            data = data.map( (item) => {
                return {
                    id: item.id,
                    nameEs: item.nameEs.replace("/"," / "),
                    nameEu: item.nameEu.replace("/"," / "),
                }
            });
            setEventTypes(data);
        }
        catch(error){
            console.log(error);
        }
    };
    
    useEffect( () => {
        getData();
    },[]);
    if(eventTypes.length === 0) return (<div className="event-type-list">Cargando...</div>);
    return (
        <div className="event-type-list">
            <EventType event={{id:"all",nameEs:"Todos",nameEu:"Guztiak"}} key={0} />
            {eventTypes.map( (event) => (
                <EventType event={event} key={event.id} />
            ))}
        </div>
    )

}

export default EventTypeList;