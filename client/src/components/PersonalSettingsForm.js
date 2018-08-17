import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Field, reduxForm } from 'redux-form'
import { connect } from "react-redux";
import * as actions from "../actions";
import idgen from './idgen';
import _ from "lodash";
import "./Settings.css"

class PersonalForm extends Component {

  componentDidMount() {
    window.jQuery(document).ready(function() {
      window.jQuery(".collapsible.personal").collapsible();
    });
  }

  submitForm(values) {
    this.props.updateUserSettings(values);
    window.scrollTo(0, 0);
  }

  renderSectors(sectors) {
    return _.map(sectors, sector => {
      return <Field key={sector.id} text={sector.name} name={`${sector.id.toString()}`} component={this.renderCheckBox} />
    })
  }

  renderCheckBox = (field) => {
    const id = idgen();
    return (<div className="col s12 m4">
      <label>
      <input {...field.input} id={id} type="checkbox" checked={field.input.value ? "checked": ""}/>
      <label htmlFor={id}>{field.text}</label>
       </label>
    </div>)
  }

  render() {
    const { handleSubmit, sectors } = this.props;
    return (
      <div className="row">
        <div className="col s12 m10 offset-m1">
          <ul className="collapsible personal">
            <li>
              <div className="collapsible-header">
                <h4 className="col s12 center">Personal Settings</h4>
              </div>
              <div className="collapsible-body">
                <form onSubmit={handleSubmit(this.submitForm.bind(this))}>
                  <div className="row">
                    <div className="col s12 m6">
                      <div className="row">
                        <div className="col s12"><h4>About You</h4></div>
                      </div>
                      <Field name="name" component="input" type="text" />
                       <label htmlFor="name">Name</label>
                      <Field className="validate" name="email" component="input" type="email" />
                       <label htmlFor="email">Email</label>
                    </div>
                    <div className="col s12 m6">
                      <div className="row">
                        <div className="col s12"><h4>Sectors You are Interested In</h4></div>
                      </div>
                        {this.renderSectors(sectors)}
                      </div>
                    <div className="col s12 m6 offset-m3 center">
                      <button className="btn button-large">Save Changes</button>
                    </div>
                  </div>
                </form>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

function getInitialValues(auth) {
  const sectors = _.reduce(auth.UsersSectors, (result, value) => {
    result[value.sector_id] = true;
    return result
  } ,{})

  return {
    name:auth.name,
    email: auth.email,
    ...sectors
  }
}
export default connect( ({auth} ) => ({initialValues: getInitialValues(auth)}),
 actions)(
  reduxForm({ form: "personalform"})(PersonalForm)
);
