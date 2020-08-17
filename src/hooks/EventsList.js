import React, { useContext, useEffect, useState } from "react";
import Event from "./Event";

function EventsList() {
  // production
  // const API_URL = "/v3/popular/event_ids/sport/football";
  // development
  const API_URL =
    "https://api.smarkets.com/v3/popular/event_ids/sport/football";

  // Component's state
  const [events, setEvents] = useState([]);

  async function getEvents() {
    try {
      const response = await fetch(API_URL);
      return response.json();
    } catch (err) {
      console.error("ERROR IN ASYNC FETCH EVENTS:\n", err);
    }
  }

  useEffect(() => {
    getEvents().then(({ popular_event_ids }) => {
      setEvents([...popular_event_ids]);
    }, console.error);
  }, [events, setEvents]);

  return (
    <div className="event-list">
      {events.map((event) => (
        <Event id={event} />
      ))}
      )
    </div>
  );
}

export default EventsList;
