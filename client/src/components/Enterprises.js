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
    this.filters = { filters: { sector_id:[], country_id:[] }, sort:""};
    this.state = { show: 4, limit: 4 };
    this.onHandleClick = this.onHandleClick.bind(this);
  }

  onHandleClick(e) {
    e.preventDefault();
    const show = this.state.show + this.state.limit;
    this.setState({ show });
  }

  renderEnterprises(enterprises) {
    const enterprisesItems = _.map(enterprises, (enterprise) => {
      return <EnterpriseItem key={ enterprise.id } userId={this.props.userId} enterprise={ enterprise } />
    })
    return enterprisesItems;
  }

  filter(type, id, value) {
    if(value) {
      this.filters = {...this.filters, filters: { ...this.filters.filters, [type]:[...this.filters.filters[type], id] } }
    } else {
      this.filters = {...this.filters, filters: { ...this.filters.filters, [type]:[ ..._.filter(this.filters.filters[type], (item => item !== id))] } }
    }
    this.props.fetchEnterprises(this.filters);
  }

  sort(by) {
    this.filters = {...this.filters,  ["sort"]: by };
    this.props.fetchEnterprises(this.filters);
  }

  render() {
    let hide = "";

    if (this.props.enterprises.length == 0) hide = "hide";

    if (Object.keys(this.props.enterprises).length <= this.state.show) {
      hide = "hide";
    }

    const enterprises = _.slice(_.values(this.props.enterprises),0, this.state.show);

    return (
      <div className="container">
      <div className="row text-flow center">
        <p className="col s12 gray-background font-title">All Enterprises Open For Review</p>
        <div className="col s12 m3 offset-m9"><Sort sort={this.sort.bind(this)} /></div>
        <div className="col s12 m3 l3"><Filter filter={this.filter.bind(this)} sectors={this.props.sectors} countries={this.props.countries} /></div>
        <div className="col s12 m9 l9">
          {this.renderEnterprises(enterprises)}
        </div>
        <div className={`col s12 m9 offset-m3 gray-background center ${hide}`}><a onClick={this.onHandleClick}className="btn-flat">Load More</a></div>
      </div>
      </div>
    );
  }
}
export default connect(null, actions)(EnterpisesList);
