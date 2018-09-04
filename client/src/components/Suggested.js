import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';
import List from "./SuggestedList"
import _ from 'lodash';
import moment from "moment";
import mtz from "moment-timezone";

class Suggested extends Component {
  componentDidMount() {
    const sectors = _.map(this.props.sectors, "sector_id");
    this.props.fetchSuggested({filters: {sector_id: sectors}});
  }

  render() {
    const { suggested } = this.props;
    return <div><List enterprises={this.props.suggested} /></div>;
  }
}

function mapStateToProps({suggested, auth}) {
  return {
    sectors: auth.UsersSectors,
    suggested: _.filter(suggested, e => moment().isBefore(mtz.tz(e.endDate, "America/Los_Angeles").format()))
  }
}

export default connect(mapStateToProps, actions)(Suggested);
