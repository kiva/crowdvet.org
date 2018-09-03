import React, { Component } from "react";
import { connect } from "react-redux";
import ProfileHeader from "./ProfileHeader";
import TopMenu from "./TopMenu";
import SubMenuInProgress from "./SubMenuInProgress";
import Enterprises from "./Enterprises";
import InProgress from "./InProgress";
import Suggested from "./Suggested";
import _ from "lodash";
import moment from "moment";
import * as actions from "../actions";

class VetEnterprises extends Component {
  constructor(props) {
    super();
    this.state = {
      menu: { inProgress: { active: true }, suggested: { active: false } },
      topMenu: {
        profile: { active: false },
        vet: { active: true },
        faqs: { active: false }
      }
    };
  }

  onSubMenuChange = menu => {
    this.setState({ menu });
  };

  componentDidMount() {
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
        <TopMenu menu={this.state.topMenu} />
        <ProfileHeader
          userEvaluations={this.props.evaluations}
          officialEvaluations={this.props.officialEvaluations}
        />
        <div>
          <div className="row dashboard">
            <SubMenuInProgress
              menu={this.state.menu}
              onSubMenuChange={this.onSubMenuChange}
            />
          </div>
          <div>{this.renderContent()}</div>
        </div>
      </div>
    );
  }

  renderContent() {
    if (this.state.menu.inProgress.active) {
      return (
        <div>
          <InProgress
            userEvaluations={_.filter(
              this.props.evaluations,
              e => e.inProgress
            )}
            enterprises={this.props.enterprises}
          />
          <Enterprises
            enterprises={_.filter(this.props.enterprises, e =>
              moment().isBefore(e.endDate)
            )}
            sectors={this.props.sectors}
            countries={this.props.countries}
          />
        </div>
      );
    }
    if (this.state.menu.suggested.active) {
      return (
        <div>
          <Suggested />
          <Enterprises
            enterprises={_.filter(this.props.enterprises, e =>
              moment().isBefore(e.endDate)
            )}
            sectors={this.props.sectors}
            countries={this.props.countries}
          />
        </div>
      );
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
