import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';
import _ from 'lodash';

class SubMenuVetted extends Component {

  onHandleClickVetted() {
    this.props.onSubMenuChange(
      {
        1: 'Vetted Enterprises',
        2: 'Vetting History'
      },
      1
    )
  }

  onHandleClickHistory() {
    this.props.onSubMenuChange(
      {
        1: 'Vetted Enterprises',
        2: 'Vetting History'
      },
      2
    )
  }

  render() {
      const menu = (
        <div>
        <div className='col s6 center'>
        <button autoFocus onClick={this.onHandleClickVetted.bind(this)} className="btn btn-flat btn-large dashboard-item">
          Vetted Enterprises
        </button>
        </div>
        <div className="col s6 center">
        <button onClick={this.onHandleClickHistory.bind(this)} className="btn btn-flat btn-large dashboard-item">
          Vetting History
        </button>
        </div>
        </div>
      );

    return menu;
  }
}

export default SubMenuVetted;
