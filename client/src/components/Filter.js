import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Field, FieldArray, reduxForm, reset } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import _ from "lodash";
import idgen from "./idgen";

class Filter extends Component {
  componentDidMount() {
    window.jQuery(document).ready(function() {
      window.jQuery(".collapsible.sectors").collapsible();
    });
  }

  onHandleSectorChange(e, newValue) {
    this.props.filter("sector_id", e.target.attributes.getNamedItem("typeid").value, newValue);
  }

  onHandleCountryChange(e, newValue) {
    this.props.filter("country_id",  e.target.attributes.getNamedItem("typeid").value, newValue);
  }

  renderSectors(sectors) {
    return _.map(sectors, sector => {
      return (
        <Field
          key={sector.id}
          id={sector.id}
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
    this.props.fetchEnterprises();
    this.props.dispatch(reset('FilterForm'));
  }

  renderCheckBox = field => {
    const id = idgen();
    const { input: { value, onChange } } = field
    console.log(value)
    return (<div className="row">
      <div className="col s12 left-align">
        <label>
          <input
            {...field.input}
            id={id}
            type="checkbox"
            typeid={field.id}
            checked={field.input.value ? "checked" : ""}
          />
          <label htmlFor={id}>{field.text}</label>
        </label>
      </div>
    </div>)
  };

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

export default connect(null, actions)(reduxForm({ form: "FilterForm" })(Filter));
