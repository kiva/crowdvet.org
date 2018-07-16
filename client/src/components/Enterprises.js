import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';
import _ from 'lodash';
import EnterpriseItem from './EnterpriseItem'
import './Enterprises.css';

class EnterpisesList extends Component {

  renderEnterprises(enterprises) {
    const enterprisesItems = _.map(enterprises, (enterprise) => {
      return <EnterpriseItem key={ enterprise.id } userId={this.props.userId} enterprise={ enterprise } />
    })
    return enterprisesItems;
  }

  render() {
    return (
      <div className="container">
      <div className="row text-flow center">
        <p className="col s12 gray-background font-title">All Enterprises Open For Review</p>
        <div className="col s12 m3 l3">Side Bar</div>
        <div className="col s12 m9 l9">
          {this.renderEnterprises(this.props.enterprises)}
        </div>
      </div>
      </div>
    );
  }
}

export default EnterpisesList;
