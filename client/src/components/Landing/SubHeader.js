import React, { Component } from 'react';
import "./SubHeader.css";

export default class SubHeader extends Component {
  constructor(props) {
    super(props);

    this.menuItems = [
      {
        title: 'About DSE',
        href: '#about-dse',
      },
      {
        title: 'How CrowdVet Works',
        href: '#how-crowdvet-works',
      },
      {
        title: 'Get Started',
        href: '#get-started',
      },
    ];
  }

  static isActive(href) {
    return !href;
  }

  static renderMenuItem({title, href}) {
    const activeClass = "white-text active-text";
    const inactiveClass = "inactive-text";

    const isActive = SubHeader.isActive(href);
    const className = `btn-flat btn-submenu top-menu line-50 ${isActive && activeClass || inactiveClass}`;

    return (
      <div className="col s4">
        <a
          className={className}
          href={href}
        >
          { title }
        </a>
      </div>
    );
  }

  render() {
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row center-align sub-header-row">
            { this.menuItems.map((menuItem) => SubHeader.renderMenuItem(menuItem)) }
          </div>
        </div>
      </div>
    );
  }
};
