import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../actions";
import _ from "lodash";

class SubMenuVetted extends Component {
  onHandleClickVetted() {
    this.props.onSubMenuChange({
      vetted: { active: true },
      history: { active: false }
    });
  }

  onHandleClickHistory() {
    this.props.onSubMenuChange({
      vetted: { active: false },
      history: { active: true }
    });
  }

  render() {
    const activeClass = "SubMenuActive";
    const inactiveClass = "SubMenuInactive";
    const menu = (
      <div>
        <div className={`col s6 center ${this.props.menu.vetted.active && activeClass || inactiveClass}`}>
          <a
            onClick={this.onHandleClickVetted.bind(this)}
            className={`btn btn-flat btn-large dashboard-item`}
          >
            Vetted Enterprises
          </a>
        </div>
        <div className={`col s6 center ${this.props.menu.history.active && activeClass || inactiveClass}`}>
          <a
            onClick={this.onHandleClickHistory.bind(this)}
            className={`btn btn-flat btn-large dashboard-item
            `}
          >
            Vetting History
          </a>
        </div>
      </div>
    );

    return menu;
  }
}

export default SubMenuVetted;
