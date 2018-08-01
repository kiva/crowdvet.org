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
      const answer = [userEvaluations[evaluation.enterprise_id].model,
      userEvaluations[evaluation.enterprise_id].impact, userEvaluations[evaluation.enterprise_id].prioritization]

      let officialAnswer = "";
      if (officialEvaluations) {
        officialAnswer = [officialEvaluations[evaluation.enterprise_id].model,
        officialEvaluations[evaluation.enterprise_id].impact, officialEvaluations[evaluation.enterprise_id].prioritization]
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
      const EvaluationResult = utils.getScoreAndAccuracy(answer, officialAnswer)

      return (
        <li>
          <div className="row margin-zero collapsible-header">
            <div className="col s2">
              {enterprises[evaluation.enterprise_id].name}
            </div>
            <div className="col s2">
              {this.getAverage(answer)}
            </div>

            <div className="col s2" />
            <div className="col s2">
              {!_.isEmpty(officialAnswer) ? this.getAverage(officialAnswer) : ""}
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
            {this.renderAnswers(userEvaluations[evaluation.enterprise_id], officialEvaluations[evaluation.enterprise_id])}
          </div>
        </li>
      );
    });
    return content;
  }

  renderAnswers(evaluation, officialEvaluation) {

      return (
        < div>
        <div className="row">
          <div className="col s2">Impact</div>
          <div className="col s2">{evaluation.impact}</div>
          <div className="col s2">First</div>
          <div className="col s2">{officialEvaluation.impact}</div>
          <div className="col s2"></div>
        </div>
        <div className="row">
          <div className="col s2">Model</div>
          <div className="col s2">{evaluation.model}</div>
          <div className="col s2">First</div>
          <div className="col s2">{officialEvaluation.model}</div>
          <div className="col s2"></div>
        </div>
        <div className="row">
          <div className="col s2">Prioritization</div>
          <div className="col s2">{evaluation.prioritization}</div>
          <div className="col s2">First</div>
          <div className="col s2">{officialEvaluation.prioritization}</div>
          <div className="col s2"></div>
        </div>
        </div>
      )
  }

  getAverage(data) {
    const r = _.map(_.compact(data), n => parseInt(n, 10))
    return _.round(_.sum(r) / r.length, 4)
  }
  getValues(data, value) {
    return _.map(data, value);
  }
}

export default VettingHistory;
