import React, { Component } from "react";
import { connect } from "react-redux";


class UserMessage extends Component {
  render() {
    return (
      <div className="row center-align" id="user-container">
        <div className="col s10 l6 offset-s1 offset-l3" id="user-title">
          Im here to help enable dreams because...
        </div>
        <h3 className="col s10 l6 offset-s1 offset-l3" id="user-msg">
          My parents came from a poor family and I want to give back and help
          people.
        </h3>
      </div>
    );
  }
}

export default UserMessage;
