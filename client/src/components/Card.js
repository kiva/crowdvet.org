import React from 'react';

const Card = ({ name, description, mainText }) => {
  return (
    <div className="col s12 m4 l4 card-review">
      <div className="card-panel teal min-height-card">
        <div className="title">{name}</div>
        <span>
          <h3>{mainText}</h3>
          <small>{description}</small>
        </span>
      </div>
    </div>
  );
};

export default Card;
