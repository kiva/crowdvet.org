import React, { Component } from 'react';
import logoGreen from './logo-green.svg';
import Google from './Google.svg';
import './Modal.css';
import $ from 'jquery';

class SignUp extends Component {
  componentDidMount() {
    $('.modal').modal();
  }

  renderForm() {
    return (
      <div className="row">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <input
                placeholder="Name"
                id="name"
                type="text"
                className="validate"
              />
              <label for="first_name">First Name</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input id="email" type="email" className="validate" />
              <label for="email">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input id="password" type="password" className="validate" />
              <label for="password">Password</label>
            </div>
          </div>
          <a class="btn" id="signup">
            <div>Sign Up</div>
          </a>
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
              <img src={logoGreen} Name="App-logo" alt="logo" />
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
                  <a class="btn signup">
                    <img src={Google} id="google" alt="logo" />
                    <div>Sign Up with Google</div>
                  </a>
                </span>
              </div>
            </div>
          </div>
          <div class="modal-footer" />
        </div>
      </div>
    );
  }
}

export default SignUp;
