import React, { useContext, useEffect, useState } from "react";

function EventsList() {
  // production
  // const API_URL = "/v3/popular/event_ids/sport/football";
  // development
  const API_URL =
    "https://api.smarkets.com/v3/popular/event_ids/sport/football";

  // Component's state
  const [events, setEvents] = useState([]);

  async function fetchEvents() {
    try {
      const response = await fetch(API_URL);
      return response.json();
    } catch (err) {
      console.error("ERROR IN ASYNC FETCH EVENTS:\n", err);
    }
  }

  useEffect(() => {
    fetchEvents().then(({ popular_event_ids }) => {
      setEvents([...popular_event_ids]);
    }, console.error);
  }, [events, setEvents]);

  return (
    <div>
      EVENTS
      {events.map((event) => {
        return (
          <div className="event-card" key={event}>
            <h3>{event}</h3>
          </div>
        );
      })}
    </div>
  );
}

export default EventsList;
