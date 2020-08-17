import React, { useEffect, useState } from "react";

function Event({ id }) {
  const API_URL = `https://api.smarkets.com/v3/events/${id}`;
  const [details, setDetails] = useState({});

  async function getDetails() {
    const response = await fetch(API_URL);
    return response.json();
  }

  useEffect(() => {
    getDetails().then(
      ({ events }) =>
        setDetails({ ...details, ...events[0] }, console.log(events[0])),
      console.error
    );
  }, [setDetails]);

  const { created, description, name, short_name, start_date } = details;

  return (
    <div className="event-card" key={id}>
      <h2>{short_name}</h2>
      <h3 className="event-name">{name}</h3>
      <h3>{start_date}</h3>
      <h4>{description}</h4>
      <h4>{created}</h4>
    </div>
  );
}

export default Event;
