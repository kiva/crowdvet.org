import React, { Component } from "react";
import { connect } from "react-redux";
import ProfileHeader from "./ProfileHeader";
import TopMenu from "./TopMenu";
import SubMenuInProgress from "./SubMenuInProgress";
import Enterprises from "./Enterprises";
import InProgress from "./InProgress";
import Suggested from "./Suggested";
import _ from "lodash";

import * as actions from "../actions";

class VetEnterprises extends Component {
  constructor(props) {
    super();
    this.state = {
      menu: { 1: "Reviews In Progress", 2: "Enterprises Suggested for You" },
      active: 1
    };
  }

  onSubMenuChange = (menu, active) => {
    this.setState({ menu: menu, active });
  };

  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchEnterprises();
    this.props.fetchUserEvaluations();
    this.props.fetchOfficialEvaluations();
    this.props.fetchSectors();
    this.props.fetchCountries();
  }

  render() {
    const { auth, enterprises } = this.props;
    // redirect user if not logged
    if (!auth) return null;
    if (!enterprises) return null;
    return (
      <div>
        <TopMenu onSubMenuChange={this.onSubMenuChange} />
        <ProfileHeader
          userEvaluations={this.props.evaluations}
          officialEvaluations={this.props.officialEvaluations}
        />
        <div>
          <div className="row flow-text dashboard">
            <SubMenuInProgress onSubMenuChange={this.onSubMenuChange} />
          </div>
          <div>{this.renderContent()}</div>
        </div>
      </div>
    );
  }

  renderContent() {
    switch (this.state.active) {
      case 1:
        return (
          <div>
            <InProgress
              userEvaluations={_.filter(this.props.evaluations, {
                inProgress: true
              })}
              enterprises={this.props.enterprises}
            />
            <Enterprises
              enterprises={this.props.enterprises}
              sectors={this.props.sectors}
              countries={this.props.countries}
            />
          </div>
        );
      case 2:
        return (
          <div>
            <Suggested />
            <Enterprises
              enterprises={this.props.enterprises}
              sectors={this.props.sectors}
              countries={this.props.countries}
            />
          </div>
        );
      default:
    }
  }
}

function mapStateToProps({
  auth,
  enterprises,
  evaluations,
  officialEvaluations,
  sectors,
  countries
}) {
  return {
    auth,
    enterprises,
    evaluations,
    officialEvaluations,
    sectors,
    countries
  };
}

export default connect(mapStateToProps, actions)(VetEnterprises);
