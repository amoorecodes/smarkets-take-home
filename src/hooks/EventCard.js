import React, { useEffect, useState } from "react";

function EventCard({ id }) {
  const API_URL = `https://api.smarkets.com/v3/events/${id}`;

  const [details, setDetails] = useState({});
  const [eventsStates, setEventsStates] = useState({});

  async function getDetails() {
    const response = await fetch(API_URL);
    return response.json();
  }

  async function getEventsStates() {
    const STATeS_URL = `https://api.smarkets.com/v3/events/${id}/states/`;
    const response = await fetch(STATeS_URL);
    // .then((response) => {
    //   console.log("what we get for states: ", response);
    // });
    const { event_states } = await response.json();
    console.log("event states in method ", event_states);
    return event_states[0];
  }

  useEffect(() => {
    getDetails()
      .then(({ events }) => {
        setDetails({ ...details, ...events[0] });
      })
      .catch(console.error);
  }, [setDetails]);

  useEffect(() => {
    getEventsStates()
      .then((states) => {
        console.log("second useEffect", states);
        states && setEventsStates({ ...eventsStates, ...states });
      })
      .catch(console.error);
  }, [setDetails]);

  const {
    created,
    description,
    name,
    short_name,
    start_date,
    full_slug,
  } = details;
  let info = [];

  // this is very hacky, fix this
  try {
    info = full_slug.split("/");
  } catch (err) {}

  return (
    <div className="event-card" key={id}>
      <h5>
        {info[2]} > {info[3]}
      </h5>
      <h2>{short_name}</h2>
      <h3 className="event-name">{name}</h3>
      <h3>{start_date}</h3>
      <h4>{description}</h4>
      {eventsStates.scores && (
        <div className="card-scores">
          <h5>{eventsStates.scores.current[0]}</h5>
          <h5>{eventsStates.scores.current[1]}</h5>
        </div>
      )}
      <hr />
      <h4>{created}</h4>
    </div>
  );
}

export default EventCard;
