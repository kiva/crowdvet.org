import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import logo from "./logo.svg";
import "./Header.css";
import Dropdown from "./Dropdown";
import { Button, NavItem } from "react-materialize";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { learn: { active: false }, user: {active:false} };
  }

  componentDidMount() {
    window.jQuery(document).ready(function() {
      window.jQuery(".button-collapse").sideNav();
    });
  }

  onHandleMenuClick(state) {
    return () => {
      this.setState( state );
    }
  }

  renderSingIn() {
    if (this.props.auth) {
      return [
        <li key="1">
          <Link to={"/user"} onClick={this.onHandleMenuClick.bind(this)({learn: { active: false }, user:{active:true}})}
                className={`font-16 ${ this.state.user.active && "weight-500"}`}>{this.props.auth.name}</Link>
        </li>,
        <li key="2">
          <Dropdown
            trigger={
              <div>
                <a>
                  <i className="material-icons right-header">arrow_drop_down</i>
                </a>
              </div>
            }
          >
            <a style={{ color: "black" }} href={"/auth/logout"}>
              Sign Out
            </a>
          </Dropdown>
        </li>
      ];
    }
    return (
      <li>
        <Link className="modal-trigger" to={"#modal1"}>
          Sign Up or Sign In
        </Link>
      </li>
    );
  }

  renderStartVetting() {
    return this.props.auth && (
      <li>
        <Link
          onClick={this.onHandleMenuClick.bind(this)({learn: { active: false },user:{active:true}})}
          className="font-16"
          to={"/vet/enterprises"}
        >
          Start Vetting
        </Link>
      </li>
    );
  }

  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <div className="container">
              <Link to={"/"} className="left-header brand-logo">
                Crowdvetting at <img src={logo} className="App-logo" alt="logo" />
              </Link>
              <a
                href="#"
                data-activates="mobile-demo"
                className="button-collapse hamburger-menu-button"
              >
                <i className="material-icons">menu</i>
              </a>
              <ul className="right hide-on-med-and-down">
                {this.renderStartVetting()}
                {this.renderSingIn()}
              </ul>
            </div>
          </div>

          <ul className="side-nav" id="mobile-demo">
            {this.renderStartVetting()}
            {this.renderSingIn()}
          </ul>
        </nav>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
