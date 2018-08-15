import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../actions";
import "./Profile.css";
import ProfileHeader from "./ProfileHeader";
import TopMenu from "./TopMenu";
import SubmenuVetted from "./SubmenuVetted";
import Enterprises from "./Enterprises";
import VettedEnterprises from "./VettedEnterprises";
import VettingHistory from "./VettingHistory";
import UserMessage from "./UserMessage";
import PersonalForm from "./PersonalSettingsForm";
import CommentHistory from "./CommentHistory";
import _ from "lodash";

class Profile extends Component {
  constructor(props) {
    super();
    this.state = {
      menu: { 1: "Vetted Enterprises", 2: "Vetting History" },
      active: 1
    };
  }

  onSubMenuChange = (menu, active) => {
    this.setState({ menu: menu, active });
  };

  componentDidMount() {
    this.props.fetchEnterprises();
    this.props.fetchUserEvaluations();
    this.props.fetchOfficialEvaluations();
    this.props.fetchSectors();
    this.props.fetchCrowdVotes();
  }

  render() {
    const { auth, enterprises, sectors } = this.props;
    if (!auth) return null;

    return (
      <div>
        <TopMenu onSubMenuChange={this.onSubMenuChange} />
        <ProfileHeader
          userEvaluations={this.props.evaluations}
          officialEvaluations={this.props.officialEvaluations}
        />
        <div>
          <div className="row flow-text dashboard">
            <SubmenuVetted onSubMenuChange={this.onSubMenuChange} />
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
            <VettedEnterprises
              enterprises={this.props.enterprises}
              userEvaluations={this.props.evaluations}
              officialEvaluations={this.props.officialEvaluations}
            />
            <UserMessage initialValues={{message: this.props.auth.message}}
            message={ this.props.auth.message}/>
            <CommentHistory comments={this.props.auth.Comments} enterprises={this.props.enterprises}/>
            <PersonalForm sectors={this.props.sectors}/>
          </div>
        );
      case 2:
        return (
          <div>
            <VettingHistory
              enterprises={this.props.enterprises}
              userEvaluations={this.props.evaluations}
              officialEvaluations={this.props.officialEvaluations}
              crowdVotes={this.props.crowdVotes}
            />
            <UserMessage initialValues={{message: this.props.auth.message}}
            message={ this.props.auth.message}/>
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
  crowdVotes
}) {
  return { auth, enterprises, evaluations, officialEvaluations, sectors, crowdVotes };
}

export default connect(mapStateToProps, actions)(Profile);
