import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import logoGreen from "./logo-green.svg";
import Google from "./Google.svg";
import "./Modal.css";
import _ from "lodash";
import SignIn from "./SignIn";
import idgen from "./idgen";

class SignUp extends Component {
  componentDidMount() {
    window.$(document).ready(function() {
      window.$(".modal").modal();
    });
  }
  componentWillUnmount() {
    window.$(".modal").modal("close");
  }

  handleFormSubmit(values) {
    this.props.signUpUser(values, this.props.history);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="red-color">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  renderField(field) {
    const { type, meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? "invalid" : ""}`;
    return (
      <div>
        <label>{field.label}</label>
        <input className={className} type={type || "text"} {...field.input} />
        <div className="text-help">{touched ? error : ""}</div>
      </div>
    );
  }

  renderCheckBox = field => {
    const { meta: { touched, error } } = field;
    return (
      <div>
        <input
          id={field.id}
          {...field.input}
          type="checkbox"
          checked={field.input.value ? "checked" : ""}
        />
        <label htmlFor={field.id}>
        I agree to the terms of Kivas volunteer agreement.
        <Link to={"/terms"} className="green-text"> Terms of Agreement * </Link>
        </label>
        <div className="text-help">{touched ? error : ""}</div>
      </div>
    );
  };

  renderForm() {
    const { handleSubmit } = this.props;
    return (
      <div className="row">
        <div className="col s12">
          <span>Sign Up with Us</span>
        </div>
        <form
          className="col s12"
          onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        >
          <div className="row">
            <div className="input-field col s12">
              <Field label="Name" name="name" component={this.renderField} />
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <Field label="Email" name="email" component={this.renderField} />
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <Field
                label="Password"
                name="password"
                type="password"
                component={this.renderField}
              />
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <Field
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                component={this.renderField}
              />
            </div>
          </div>
          <p>
          <Field
            name="terms"
            id="terms"
            component={this.renderCheckBox}
          />
        </p>
          <div className="row">
            {this.renderAlert()}
          </div>
          <div className="row">
            <button className="btn" id="signup">
              <div>Sign Up</div>
            </button>
          </div>
        </form>
      </div>
    );
  }
  render() {
    return (
      <div className="center-align">
        <div id="modal1" className="modal">
          <div className="modal-content">
            <div>
              <img src={logoGreen} alt="logo" />
            </div>
            <small>Enabling Dreams All Around the world</small>
            <div className="row">
              <div className="grid col s12 m6">
                <span className="flow-text small">
                  Welcome Back, please Sign In
                </span>
                {<SignIn history={this.props.history} />}
              </div>
              <div className="grid col s12 m6">
                <span className="flow-text small">
                  Connect a Social Media Account
                </span>
                <span className="flow-text">
                  <a href={"/auth/google"} className="btn signup">
                    <img src={Google} id="google" alt="logo" />
                    <div>Sign Up with Google</div>
                  </a>
                </span>
              </div>
              <div className="col s12 m6">
                <br />
                <div>{this.renderForm()}</div>
              </div>
            </div>
          </div>
          <div className="modal-footer" />
        </div>
      </div>
    );
  }
}
function validate(formProps) {
  const errors = {};
  if (!formProps.name) {
    errors.name = "Please enter a name";
  }
  if (!formProps.email) {
    errors.email = "Please enter an email";
  }

  if (!formProps.password) {
    errors.password = "Please enter a password";
  }

  if (!formProps.confirmPassword) {
    errors.confirmPassword = "Please enter a password";
  }

  if (formProps.password && formProps.password != formProps.confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }

  if (!formProps.terms) {
    errors.terms = "Please, accept Kiva's volunteer agreement";
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: _.get(state.auth, "error") };
}

export default reduxForm({
  form: "signup",
  fields: ["email", "password", "name", "confirmPassword"],
  validate
})(connect(mapStateToProps, actions)(withRouter(SignUp)));
