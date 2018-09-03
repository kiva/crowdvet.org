import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
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
  render() {
    const startVetting = (this.props.auth && (
      <Link onClick={this.onHandleMenuClick.bind(this)({learn: { active: false },user:{active:true}})} className="font-16" to={"/vet/enterprises"}>Start Vetting</Link>
    )) || (
      <Link onClick={this.onHandleMenuClick.bind(this)({learn: { active: false }, user:{active:true}})} className="font-16 modal-trigger" to={"#modal1"}>
        Start Vetting
      </Link>
    );
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <Link to={"/"} className="left-header brand-logo">
              Crowdvetting at <img src={logo} className="App-logo" alt="logo" />
            </Link>
            <a
              href="#"
              data-activates="mobile-demo"
              className="button-collapse"
            >
              <i className="material-icons">menu</i>
            </a>
            <ul className="right hide-on-med-and-down">
              <li>

                <Link to={"/learn"} onClick={this.onHandleMenuClick.bind(this)({learn: { active: true }, user: {active:false} })}
                 className={ `font-16 ${this.state.learn.active && "weight-500"} `}>Learn about Crowdvetting</Link>
              </li>
              <li>{startVetting}</li>
              {this.renderSingIn()}
            </ul>
          </div>

          <ul className="side-nav" id="mobile-demo">
            <li>
              <Link
                to={"/learn"}
              >
                Learn about Crowdvetting
              </Link>
            </li>
            <li>
              {startVetting}
            </li>
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
