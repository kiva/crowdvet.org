import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import './Header.css';
import $ from 'jquery';

class Header extends Component {
  componentDidMount() {
    $('.button-collapse').sideNav();
  }

  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <Link to={'/'} className="left brand-logo">
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
                <Link to={'sass.html'}>Learn about Crowdvetting</Link>
              </li>
              <li>
                <Link to={'badges.html'}>Take Action</Link>
              </li>
              <li>
                <Link className="modal-trigger" to={'#modal1'}>Sign Up or Sign In</Link>
              </li>
            </ul>
            <ul className="side-nav" id="mobile-demo">
              <li>
                <Link to={'sass.html'}>Learn about Crowdvetting</Link>
              </li>
              <li>
                <Link to={'badges.html'}>Take Action</Link>
              </li>
              <li>
                <a href="collapsible.html">Javascript</a>
              </li>
              <li>
                <Link to={'collapsible.html'}>Sign Up or Sign In</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
//this.props.auth ? '/blogs' : '/'
export default Header;
