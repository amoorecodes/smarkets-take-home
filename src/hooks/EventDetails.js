import React, { useState } from "react";

function EventDetails({ id }) {
  const [eventDetails, setEventDetails] = useState({ name: "event #1" });
  const categories = [
    "ALL",
    "POPULAR",
    "WINNER",
    "GOALS",
    "TEAMS",
    "TOTALS",
    "HANDICAP",
    "PLAYERS",
  ];

  return (
    <div>
      <h1>{eventDetails.name}</h1>
      {/* insert timestamp / available markets */}
      <hr />
      {/* insert buttons */}
      {categories.map((button) => (
        <a href={`/${button.toLowerCase()}`} key={button}>
          <button>{button}</button>
        </a>
      ))}
    </div>
  );
}

export default EventDetails;
