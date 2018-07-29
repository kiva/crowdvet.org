import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';
import _ from 'lodash';
import EnterpriseItem from './EnterpriseItem'
import './Enterprises.css';
import Filter from './Filter'
import Sort from './Sort'

class EnterpisesList extends Component {

  constructor(props) {
    super(props);
    this.filters = {sector_id:[], country_id:[], sort:""};
  }
  renderEnterprises(enterprises) {
    const enterprisesItems = _.map(enterprises, (enterprise) => {
      return <EnterpriseItem key={ enterprise.id } userId={this.props.userId} enterprise={ enterprise } />
    })
    return enterprisesItems;
  }

  filter(type, id, value) {
    if(value) {
      this.filters = {...this.filters, [type]:[...this.filters[type], id] }
    } else {
      this.filters = {...this.filters, [type]:[ ..._.filter(this.filters[type], (item => item !== id))] }
    }
    this.props.fetchEnterprises(this.filters);
  }

  sort(by) {
    this.filters = {...this.filters,  ["sort"]: by };
    this.props.fetchEnterprises(this.filters);
  }

  render() {
    return (
      <div className="container">
      <div className="row text-flow center">
        <p className="col s12 gray-background font-title">All Enterprises Open For Review</p>
        <div className="col s12 m3 offset-m9"><Sort filter={this.sort.bind(this)} /></div>
        <div className="col s12 m3 l3"><Filter filter={this.filter.bind(this)} sectors={this.props.sectors} countries={this.props.countries} /></div>
        <div className="col s12 m9 l9">
          {this.renderEnterprises(this.props.enterprises)}
        </div>
      </div>
      </div>
    );
  }
}
export default connect(null, actions)(EnterpisesList);
