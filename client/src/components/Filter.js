import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Field, FieldArray, reduxForm, reset } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import _ from "lodash";

class Filter extends Component {
  componentDidMount() {
    window.jQuery(document).ready(function() {
      window.jQuery(".collapsible.sectors").collapsible();
    });
  }

  onHandleSectorChange(e, newValue) {
    this.props.filter("sector_id", e.target.id, newValue);
  }

  onHandleCountryChange(e, newValue) {
    this.props.filter("country_id", e.target.id, newValue);
  }

  renderSectors(sectors) {
    return _.map(sectors, sector => {
      return (
        <Field
          id={sector.id}
          key={sector.id}
          text={sector.name}
          name={sector.name}
          component={this.renderCheckBox}
          onChange={this.onHandleSectorChange.bind(this)}
        />
      );
    });
  }

  renderCountries(countries) {
    return _.map(countries, country => {
      return (
        <Field
          key={country.id}
          id={country.id}
          text={country.name}
          name={country.name}
          component={this.renderCheckBox}
          onChange={this.onHandleCountryChange.bind(this)}
        />
      );
    });
  }

  onHandleResetClick(e) {
    e.preventDefault()
    this.props.dispatch(reset('filterForm'));
  }

  renderCheckBox = field => (
    <div className="row">
      <div className="col s12 left-align">
        <label>
          <input
            {...field.input}
            id={field.id}
            type="checkbox"
            checked={field.input.value ? "checked" : ""}
          />
          <span>{field.text}</span>
        </label>
      </div>
    </div>
  );

  render() {

    const { countries, sectors } = this.props;
    return (
      <form>
        <ul className="collapsible sectors">
          <li>
            <div className="collapsible-header">
              <div className="col s12 center">Primary Sectors</div>
            </div>
            <div className="collapsible-body">
              <div className="row">{this.renderSectors(sectors)}</div>
            </div>
          </li>
          <li>
            <div className="collapsible-header">
              <div className="col s12 center">Country</div>
            </div>
            <div className="collapsible-body">
              <div className="row">{this.renderCountries(countries)}</div>
            </div>
          </li>
          <li>
            <a href="" onClick={this.onHandleResetClick.bind(this)} > Reset all filters</a>
          </li>
        </ul>
      </form>
    );
  }
}

export default connect(null, null)(reduxForm({ form: "filterForm" })(Filter));
