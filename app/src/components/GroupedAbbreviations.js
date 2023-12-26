import React from "react";

const GroupedAbbreviations = React.memo(({ group }) => {
  return (
    <>
      <h3
        aria-label={`Group for letter ${group.letter}`}
        className="col-12 col-lg-3 col-xl-4 text-center"
      >
        {group.letter}
      </h3>
      <ul className="col-12 col-lg-9 col-xl-8 list-group list-group-flush">
        {group.items.map((item, index) => (
          <li key={`${group.letter}-${index}`} className="list-group-item">
            <span className="fw-bold">{item.key}</span>: {item.value}
          </li>
        ))}
      </ul>
      <hr />
    </>
  );
});

export default GroupedAbbreviations;
