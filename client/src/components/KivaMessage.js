import React, { Component } from "react";
import "./KivaMessage.css"

function KivaMessage(props) {
  const backgroundClass = props.background ? props.background : "background-regular";

  return (
    <div className="row">
      <div className="col s12" style={{height:"100px"}}>
        <div className={`btn kiva-message-btn ${backgroundClass}`}>
          <div className="kiva-message-btn-text">{props.message}</div>
        </div>
      </div>
    </div>
  );
}

export default KivaMessage;
