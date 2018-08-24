import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../actions";
import _ from "lodash";

class TopMenu extends Component {

  render() {
    const activeClass = "white-text active-text";
    const inactiveClass = "inactive-text";
    return (
      <div className="row center-align dashboard">
        <div className="col s4 top-menu">
          <Link to={"/user"} className={`btn btn-flat top-menu btn-large ${this.props.menu.profile.active && activeClass || inactiveClass}`}>
            Profile
          </Link>
        </div>
        <div className="col s4 top-menu">
          <Link to={"/vet/enterprises"}  className={`btn btn-flat top-menu btn-large ${this.props.menu.vet.active && activeClass || inactiveClass}`}>
            Vet Enterprises
          </Link>
        </div>
        <div className="col s4 top-menu">
          <button className={`btn btn-flat top-menu btn-large ${this.props.menu.training.active && activeClass || inactiveClass}`}>Training</button>
        </div>
      </div>
    );
  }
}

// Specifies the default values for props:
TopMenu.defaultProps = {
  menu : {
    profile: { active: true },
    vet: { active: false },
    training: { active: false }
  }
};


export default TopMenu;
