import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../actions';
import _ from "lodash";

class SignIn extends Component {

  handleFormSubmit(values) {
    this.props.signInUser(values, this.props.history);
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
    const className = `form-group ${touched && error ? 'invalid' : ''}`;
    return (
      <div>
        <label>{field.label}</label>
        <input className={className} type={type || 'text'} {...field.input} />
        <div className="text-help">{touched ? error : ''}</div>
      </div>
    );
  }

  render(){
    const { handleSubmit } = this.props;

    return (
    <div className="row">
      <form
        className="col s12"
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
      >
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
        {this.renderAlert()}
      </div>
      <button className="btn" id="signup">
        <div>Sign In</div>
      </button>
      </form>
    </div>
    )
  }
}

function validate(formProps) {
  const errors = {};
  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }
  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }
  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: _.get(state.auth, "signinError") };
}

export default connect(mapStateToProps, actions)(
  reduxForm({ form: "signInform", validate })(SignIn)
);
