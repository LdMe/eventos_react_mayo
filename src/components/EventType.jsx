import { useContext } from "react";
import IdiomaContext from "../context/idiomaContext";
import EventTypeContext from "../context/EventTypeContext";

const EventType = ({ event }) => {
    const idioma  = useContext(IdiomaContext);
    const { eventType,setEventType } = useContext(EventTypeContext);
    const handleClick = () => {
        setEventType(event.id);
    }
    let classVar = "event-type" + (eventType === event.id ? " selected" : "");
    return (
        <div className={classVar} onClick={handleClick}>
            <h3>{idioma === "es" ? event.nameEs : event.nameEu}</h3>
        </div>
    )
}

export default EventType;