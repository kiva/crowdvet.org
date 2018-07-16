import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import logo from "./logo.svg";
import "./Header.css";

class Header extends Component {
  componentDidMount() {
    window.jQuery(document).ready(function() {
      window.jQuery(".sidenav").sidenav();
    });
  }
  renderSingIn() {
    if (this.props.auth) {
      return [
        <li key="1">
          <Link to={"/user"}>My Profile</Link>
        </li>,
        <li key="2">
          <a href={"/auth/logout"}>Logout</a>
        </li>
      ];
    }
    return (
      <li>
        <Link className="modal-trigger" to={"#modal1"}>
          Sign Up or Sing In
        </Link>
      </li>
    );
  }
  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <Link to={'/'} className="left brand-logo">
              Crowdvetting at <img src={logo} className="App-logo" alt="logo" />
            </Link>
            <a href="#" data-target="mobile-demo" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            <ul className="right hide-on-med-and-down">
              <li>
                <Link to={'sass.html'}>Learn about Crowdvetting</Link>
              </li>
              <li>
                <Link to={'badges.html'}>Take Action</Link>
              </li>
              {this.renderSingIn()}
            </ul>
          </div>
        </nav>

        <ul className="sidenav" id="mobile-demo">
          <li>
            <Link to={'sass.html'}>Learn about Crowdvetting</Link>
          </li>
          <li>
              <Link to={'badges.html'}>Take Action</Link>
          </li>
              {this.renderSingIn()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
