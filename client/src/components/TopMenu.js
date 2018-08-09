import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';
import _ from 'lodash';

class TopMenu extends Component {
  render() {
    return (
      <div className="row center-align dashboard">
        <div className="col s4 top-menu">
          <Link to={'/user'} className="btn flat btn-flat btn-large" >
            Profile
          </Link>
        </div>
        <div className="col s4 top-menu">
          <Link to={"/vet/enterprises"} className="btn flat btn-flat btn-large">
            Vet Enterprises
          </Link>
        </div>
        <div className="col s4 top-menu">
          <button className="btn flat btn-flat btn-large">Training</button>
        </div>
      </div>
    );
  }
}

export default TopMenu;
