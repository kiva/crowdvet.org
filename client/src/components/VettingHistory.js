import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import UserMessage from "./UserMessage";
import * as actions from "../actions";
import _ from "lodash";
import utils from './utils'

class VettingHistory extends Component {
  render() {
    const content = !_.isEmpty(this.props.userEvaluations) ? this.renderHistory() : this.renderMessage();
    return <div className="container">{content}</div>;
  }

  renderMessage() {
      return <h3 className="center">You have not vetted any enterprises yet...</h3>
  }

  componentDidMount() {
    window.jQuery(document).ready(function() {
      window.jQuery(".collapsible").collapsible();
    });
  }
  renderTable() {
    return (
      <div>
        <table className="centered" style={{ background: "#F8F8F8" }}>
          <thead>
            <tr>
              <th>Enterprise</th>
              <th>My vote</th>
              <th>Crowd Vote</th>
              <th>Kiva Vote</th>
              <th>Outcome</th>
              <th>Score</th>
              <th>Accuracy</th>
            </tr>
          </thead>
        </table>
      </div>
    );
  }

  renderHistory() {
    return (
      <div>
        {this.renderTable()}
        <ul className="collapsible">{this.renderHistoryContent()}</ul>
      </div>
    );
  }
  renderHistoryContent() {
    const { userEvaluations, officialEvaluations, enterprises } = this.props;
    const content = _.map(userEvaluations, evaluation => {
      const answer = this.getValues(
        userEvaluations[evaluation.enterprise_id].Votes,
        "Answer"
      );
      let officialAnswer = "";
      if (officialEvaluations) {
        officialAnswer = this.getValues(
          _.get(officialEvaluations[evaluation.enterprise_id], "Votes"),
          "Answer"
        );
      }

      let stateColor = "";
      switch (_.get(
        officialEvaluations[evaluation.enterprise_id],
        "status"
      )) {
        case "Approved":
          stateColor = "green-text";
          break;
        case "Declined":
          stateColor = "red-text";
          break;
        default:
          stateColor = "yellow-text";
      }
      const EvaluationResult = utils.getScoreAndAccuracy(this.getValues(answer, "score"),
      this.getValues(officialAnswer, "score"))

      return (
        <li>
          <div className="row margin-zero collapsible-header">
            <div className="col s2">
              {enterprises[evaluation.enterprise_id].name}
            </div>
            <div className="col s2">
              {this.getAverage(this.getValues(answer, "score"))}
            </div>

            <div className="col s2" />
            <div className="col s2">
              {!_.isEmpty(officialAnswer) ? this.getAverage(this.getValues(officialAnswer, "score")) : ""}
            </div>
            <div className={`col s2 ${stateColor}`}>
              {_.get(officialEvaluations[evaluation.enterprise_id], "status")
                ? officialEvaluations[evaluation.enterprise_id].status
                : "Pending"}
            </div>
            <div className="col s1">{EvaluationResult ? EvaluationResult.Score : ""}</div>
            <div className="col s1">{EvaluationResult ? EvaluationResult.Accuracy + "%" : ""}</div>
          </div>
          <div className="collapsible-body">
            {this.renderAnswers(userEvaluations[evaluation.enterprise_id].Votes, _.get(officialEvaluations[evaluation.enterprise_id], "Votes"))}
          </div>
        </li>
      );
    });
    return content;
  }

  renderAnswers(votes, officialVotes) {
    const official = _.mapKeys(officialVotes, "question_id");

    const content = _.map(votes, vote => {
      const officialScore = official[vote.Question.id] ? official[vote.Question.id].Answer.score : "";

      return (
        <div className="row">
          <div className="col s2">{vote.Question.name}</div>
          <div className="col s2">{vote.Answer.score}</div>
          <div className="col s2">First</div>
          <div className="col s2">{officialScore}</div>
          <div className="col s2"></div>
        </div>
      )
    })

    return content;
  }

  getAverage(data) {
    return _.round(_.sum(data) / data.length, 4)
  }
  getValues(data, value) {
    return _.map(data, value);
  }
}

export default VettingHistory;
