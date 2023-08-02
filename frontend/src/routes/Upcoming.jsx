import { useState,useRef } from 'react';
import '../App.scss';
import '../styles/Button.scss';

import EventTypeList from '../components/EventTypeList';
import EventList from '../components/EventList';

import EventTypeContext from '../context/EventTypeContext';


function Upcoming() {
  const [eventType, setEventType] = useState('all');
  
  return (
      <EventTypeContext.Provider value={{eventType,setEventType}}>
        
        <EventTypeList />
        <EventList />
      </EventTypeContext.Provider>
  );
}

export default Upcoming;
