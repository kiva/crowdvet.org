import React from 'react';

import * as actions from '../actions';
import { connect } from 'react-redux';

export class ForgotPass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resetText: 'hide',
    }
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    const formData = {email: this.email.value};
    this.props.dispatch(actions.sendResetPasswordEmail(formData));
    this.setState({resetText: ''});
  }

  render(){
    return (
      <div className={`${this.props.hide}`} >
        <form className='form'>
          <label htmlFor="email">Please enter your email to receive password reset instructions:</label>
          <input type='email' id="email" ref={ref => this.email = ref} placeholder="Email"></input>
          <a onClick={this.onSubmit} type='submit' className='btn-flat start-vetting-btn'>Submit</a>
        </form>
        <div className={`green-text ${this.state.resetText}`}>
          <p>An email with
            password reset instructions has been sent to the entered address.
          </p>
        </div>
      </div>
    )
  }
}

export default connect()(ForgotPass);
