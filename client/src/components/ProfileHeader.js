import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Enterprises from "./Enterprises";
import VettedEnterprises from "./VettedEnterprises";
import _ from "lodash";
import utils from './utils';

class ProfileHeader extends Component {

  render() {
    const { auth, userEvaluations, officialEvaluations } = this.props;
    // redirect user if not logged
    if (!auth) return null;
    const result = utils.getOverallResults(userEvaluations, officialEvaluations);

    const image = `${this.props.auth.image.slice(0, -2)}200`;
    return (
      <div>
        <div className="container">
          <br />
          <div className="row">
            <div className="col s12 m4 l4">
              <img src={image} alt="" className="circle responsive-img" />
            </div>
            <div className="col s12 m8 l8 name">
              {auth.name}
              <div className="score">Score: {result ? result.GeneralScore : ""} | Accuracy: {result ? result.GeneralAccuracy : ""}%</div>
              <div className="community">
                Community Member Since January 12, 2017 | Vetted {result ? result.count : ""} Social
                Enterprises
              </div>
              <div className="community">Badge Showcase</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({
  auth,
}) {
  return { auth };
}

export default connect(mapStateToProps, null)(ProfileHeader);
