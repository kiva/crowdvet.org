import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import logoGreen from './logo-green.svg';
import Google from './Google.svg';
import './Modal.css';
//import $ from 'jquery';

class SignUp extends Component {
  componentDidMount() {
    window.jQuery(document).ready(function() {
      window.jQuery('.modal').modal();
    })
  }

  handleFormSubmit(values) {
    this.props.signUpUser(values, this.props.history);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  renderField(field) {
    const { type, meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'invalid' : ''}`;
    return (
      <div>
        <label>{field.label}</label>
        <input className={className} type={type || 'text'} {...field.input} />
        <div className="text-help">{touched ? error : ''}</div>
      </div>
    );
  }

  renderForm() {
    const { handleSubmit } = this.props;
    return (
      <div className="row">
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
          <button className="btn" id="signup">
            <div>Sign Up</div>
          </button>
        </form>
      </div>
    );
  }
  render() {
    return (
      <div className="center-align">
        <div id="modal1" className="modal modal-fixed-footer">
          <div className="modal-content">
            <div>
              <img src={logoGreen} alt="logo" />
            </div>
            <small>Enabling Dreams All Around the world</small>
            <div className="row">
              <div className="grid col s12 m6">
                <span className="flow-text small">Sign Up with Us</span>
                {this.renderForm()}
              </div>
              <div className="grid col s12 m6">
                <span className="flow-text small">
                  Connect a Social Media Account
                </span>
                <span className="flow-text">
                  <a href={'/auth/google'} className="btn signup">
                    <img src={Google} id="google" alt="logo" />
                    <div>Sign Up with Google</div>
                  </a>
                </span>
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
    errors.name = 'Please enter a name';
  }
  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }
  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }
  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth };
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'name'],
  validate
})(connect(mapStateToProps, actions)(withRouter(SignUp)));
