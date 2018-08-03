import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';
import _ from 'lodash';

class SubMenuInprogress extends Component {

  onHandleClickInProgress() {
    this.props.onSubMenuChange(
      {
        1: 'Reviews In Progress',
        2: 'Enterprises Suggested for You'
      },
      1
    )
  }

  onHandleClickSuggested() {
    this.props.onSubMenuChange(
      {
        1: 'Reviews In Progress',
        2: 'Enterprises Suggested for You'
      },
      2
    )
  }

  render() {
      const menu = (
        <div>
        <div className='col s6 center'>
        <button autoFocus onClick={this.onHandleClickInProgress.bind(this)} className="btn btn-flat btn-large dashboard-item">
          Reviews In Progress
        </button>
        </div>
        <div className="col s6 center">
        <button onClick={this.onHandleClickSuggested.bind(this)} className="btn btn-flat btn-large dashboard-item">
          Enterprises Suggested for You
        </button>
        </div>
        </div>
      );

    return menu;
  }
}

export default SubMenuInprogress;
