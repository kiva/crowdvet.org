import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';
import _ from 'lodash';

class SubMenuInprogress extends Component {

  onHandleClickInProgress() {
    this.props.onSubMenuChange(
      { inProgress: {active: true}, suggested: {active:false} }

    )
  }

  onHandleClickSuggested() {
    this.props.onSubMenuChange(
      { inProgress: {active: false}, suggested: {active:true} })
  }

  render() {
    const activeClass = "SubMenuActive";
    const inactiveClass = "SubMenuInactive";

    const menu = (
      <div>
      <div className={`col s6 center ${this.props.menu.inProgress.active && activeClass || inactiveClass}`}>
      <a onClick={this.onHandleClickInProgress.bind(this)} className="btn btn-flat btn-large dashboard-item">
        Reviews In Progress
      </a>
      </div>
      <div className={`col s6 center ${this.props.menu.suggested.active && activeClass || inactiveClass}`}>
      <a onClick={this.onHandleClickSuggested.bind(this)} className="btn btn-flat btn-large dashboard-item">
        Enterprises Suggested for You
      </a>
      </div>
      </div>
    );

    return menu;
  }
}

export default SubMenuInprogress;
