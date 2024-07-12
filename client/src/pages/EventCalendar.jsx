import React, { useEffect, useState } from 'react';
import { Calendar, Badge } from 'antd';
import { useQuery } from '@apollo/client';
import { GET_EVENTS } from '../utils/queries';
import '../styles/EventCalendar.css';
import moment from 'moment';

const EventCalendar = () => {
  const { data, loading, error } = useQuery(GET_EVENTS);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (data) {
      setEvents(data.events); // Update events state with fetched data
    }
  }, [data]);

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error loading events: {error.message}</p>;

  const cellRender = (value) => {
    const formattedDate = value.format('MM/DD/YYYY');
    const dayEvents = events.filter(event => {
      return moment(event.date, 'MM/DD/YYYY').isSame(moment(formattedDate, 'MM/DD/YYYY'), 'day');
    });

    return (
      <ul className="events">
        {dayEvents.map(event => (
          <li key={event.id}>
            <Badge status="success" text={event.title} style={{fontWeight: '900'}} />
            <p>{event.location}</p>
            <p id="time">{event.time}</p>
            <p id="description">{event.description}</p>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div style={{ maxWidth: '85%', margin: '0 auto', marginTop: '2rem', boxShadow: '0px 0px 15px 8px #888888' }}>
      <Calendar cellRender={cellRender} />
    </div>
  );
};

export default EventCalendar;
