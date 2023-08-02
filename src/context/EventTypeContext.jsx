import {createContext} from 'react';

const EventTypeContext = createContext({
    eventType:"all",
    setEventType: () => {}
});

export default EventTypeContext;