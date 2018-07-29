import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';
import _ from 'lodash';

class SubMenu extends Component {

  render() {
    let column;
    switch (_.size(this.props.menu)) {
      case 2:
        column = "s6";
        break;
      case 3:
        column = "s4";
        break;
      case 4:
        column = "s3";
        break;
    }
    const menu = _.map(this.props.menu, item => {
      return (
        <div className={`col ${column} center`}>
        <button className="btn btn-flat btn-large dashboard-item">
          { item }
        </button>
        </div>

      );
    });
    return menu;
  }
}

export default SubMenu;
