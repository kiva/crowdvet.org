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
    super(props);
    this.state = {
      menu: { vetted: { active: true }, history: { active: false } },
      topMenu: {
        profile: { active: true },
        vet: { active: false },
        faqs: { active: false }
      }
    };
  }

  onSubMenuChange = menu => {
    this.setState({ menu });
  };

  componentDidMount() {
    window.scrollTo(0, 0);
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
        <TopMenu menu={this.state.topMenu} />
        <ProfileHeader
          userEvaluations={this.props.evaluations}
          officialEvaluations={this.props.officialEvaluations}
        />
        <div>
          <div className="row dashboard">
            <SubmenuVetted
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
    if (this.state.menu.vetted.active) {
      return (
        <div>
          <VettedEnterprises
            enterprises={this.props.enterprises}
            userEvaluations={_.filter(
              this.props.evaluations,
              e => !e.inProgress
            )}
            officialEvaluations={this.props.officialEvaluations}
          />
          <UserMessage
            initialValues={{ message: this.props.auth.message }}
            message={this.props.auth.message}
          />
          <CommentHistory
            comments={this.props.auth.Comments}
            enterprises={this.props.enterprises}
          />
          <PersonalForm sectors={this.props.sectors} />
        </div>
      );
    }

    if (this.state.menu.history.active) {
      return (
        <div>
          <VettingHistory
            enterprises={this.props.enterprises}
            userEvaluations={this.props.evaluations}
            officialEvaluations={this.props.officialEvaluations}
            crowdVotes={this.props.crowdVotes}
          />
          <UserMessage
            initialValues={{ message: this.props.auth.message }}
            message={this.props.auth.message}
          />
          <CommentHistory
            comments={this.props.auth.Comments}
            enterprises={this.props.enterprises}
          />
          <PersonalForm sectors={this.props.sectors} />
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
  crowdVotes
}) {
  return {
    auth,
    enterprises,
    evaluations,
    officialEvaluations,
    sectors,
    crowdVotes
  };
}

export default connect(mapStateToProps, actions)(Profile);
