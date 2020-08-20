import React, { useContext, useEffect, useState } from "react";
import EventCard from "./EventCard";

function EventsList() {
  // Component's state
  const [events, setEvents] = useState([]);
  const [eventType, setEventType] = useState("football");
  const [eventsStats, setEventsStats] = useState({});

  // production
  // const API_URL = "/v3/popular/event_ids/sport/football";
  // development
  const API_URL = `https://api.smarkets.com/v3/popular/event_ids/sport/${eventType}`;

  // func to fetch all popular soccer games asyncronously
  async function getEvents() {
    try {
      const response = await fetch(API_URL);
      return response.json();
    } catch (err) {
      console.error("ERROR IN ASYNC FETCH EVENTS:\n", err);
    }
  }

  // func to fetch statistics for popular events asyncronously
  // async function getEventsStats(event_ids) {
  //   console.log("EVENT IDS >>> ", event_ids);

  //   let STATS_URL = `https://api.smarkets.com/v3/events/${event_ids}/stats/`;
  //   const response = await fetch(STATS_URL).then((response) => {
  //     console.log("what we get for stats: ", response);
  //   });
  //   return response.json();
  // }

  useEffect(() => {
    getEvents().then(({ popular_event_ids }) => {
      setEvents([...popular_event_ids]);
      // })
      // .then(
      //   () => (
      //     console.log("events >>> ", events), getEventsStats(events.toString())
      //   )
      // )
      // .then((stats) => console.log("stats in useEffect", stats))
      // .catch(console.error);
    }, console.error);
  }, [setEvents]);

  return (
    <div>
      <h1>Soccer odds</h1>
      <p>
        Trade and bet on a variety of football betting markets, including those
        on the Premier League, Champions League, La Liga, Bundesliga and
        Belarusian Premier League
      </p>
      <div className="event-list">
        {events.map((event) => (
          <EventCard id={event} />
        ))}
        )
      </div>
    </div>
  );
}

export default EventsList;
