import {useContext,useEffect,useState,useRef} from 'react';

import EventTypeContext from '../context/EventTypeContext';
import Event from './Event';
import '../styles/Event.scss'

const EventList = () => {
    const [events,setEvents] = useState([]);
    const  [page,setPage] = useState(1);
    const [totalPages,setTotalPages] = useState(1);
    const {eventType} = useContext(EventTypeContext);
    const totalPagesRef = useRef(totalPages);
    const getData = async () => {
        try{
            const url  = new URL('https://api.euskadi.eus/culture/events/v1.0/events/upcoming');
            if (eventType !== "all") {
                url.searchParams.set('type',eventType);
            }
            url.searchParams.set('_page',page);
            const response = await fetch(url.toString());
            const data = await response.json();
            console.log(data);
            setTotalPages(data.totalPages);
            if(page === 1) {
                setEvents(data.items);
            }
            else
            {
                setEvents([...events,...data.items]);
            }
        }
        catch(error){
            console.log(error);
        }
    };
    useEffect( () => {
        setPage(1);
        setEvents([]);
        getData();
    },[eventType]);

    useEffect( () => {
        getData();
    },[page]);

    useEffect( () => {
        totalPagesRef.current = totalPages;
    },[totalPages]);
    
    useEffect( () => {
        const handleScroll = (e) => {
            const bottom = window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight;
            if(bottom) {
                console.log("totalPages ",totalPagesRef.current);
                if(page < totalPagesRef.current){
                    setPage(page + 1);
                }
            }
        }
        
        window.addEventListener('scroll',handleScroll);
        return () => {
            window.removeEventListener('scroll',handleScroll);
        }
    },[page]);


    return (
        <div>
            <section className="event-list" >
                {events.length === 0 && <p>Cargando</p>}
                {events.map( (event) => (
                    <Event event={event} key={event.id} />
                ))}
            </section>
            {page < totalPages && <p>Cargando más eventos</p>}
        </div>
    )

}

export default EventList;