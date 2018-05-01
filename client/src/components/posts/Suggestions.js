import React from "react";

const Suggestions = props => {
  const options = props.results.slice(0, 5).map(r => (
    <li key={r.id}>
      {r.title ? r.title : r.name}{" "}
      {r.first_air_date ? r.first_air_date : r.first_release_date}
    </li>
  ));
  return <ul>{options}</ul>;
};

export default Suggestions;
