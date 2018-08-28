import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import UserMessage from "./UserMessage";
import * as actions from "../actions";
import _ from "lodash";
import utils from "./utils";

class VettingHistory extends Component {
  render() {
    const content = !_.isEmpty(this.props.userEvaluations)
      ? this.renderHistory()
      : this.renderMessage();
    return <div className="container"><br />{content}</div>;
  }

  renderMessage() {
    return (
      <h3 className="center">You have not vetted any enterprises yet...</h3>
    );
  }

  componentDidMount() {
    window.jQuery(document).ready(function() {
      window.jQuery(".collapsible").collapsible();
    });
  }
  renderTable() {
    return (
      <div>
        <div className="row center " style={{ background: "#F8F8F8", height:"50px"}}>
          <div className="col s2 center bold line-50">Enterprise</div>
          <div className="col s2 center bold line-50">My vote</div>
          <div className="col s2 center bold line-50">Crowd Vote</div>
          <div className="col s2 center bold line-50">Kiva Vote</div>
          <div className="col s2 center bold line-50">Outcome</div>
          <div className="col s1 center bold line-50">Score</div>
          <div className="col s1 center bold line-50">Accuracy</div>
        </div>
      </div>
    );
  }

  renderHistory() {
    return (
      <div>
        {this.renderTable()}
        <div className="row">
        <ul className="collapsible">{this.renderHistoryContent()}</ul>
        </div>
      </div>
    );
  }
  renderHistoryContent() {
    const {
      userEvaluations,
      officialEvaluations,
      enterprises,
      crowdVotes
    } = this.props;

    const content = _.map(userEvaluations, evaluation => {

      if(evaluation.inProgress || evaluation.exclude) {
        return null
      }

      const answer = [
        userEvaluations[evaluation.enterprise_id].model,
        userEvaluations[evaluation.enterprise_id].impact,
        userEvaluations[evaluation.enterprise_id].prioritization
      ];

      let officialAnswer = "";

      if (officialEvaluations[evaluation.enterprise_id]) {
        officialAnswer = [
          officialEvaluations[evaluation.enterprise_id].model,
          officialEvaluations[evaluation.enterprise_id].impact,
          officialEvaluations[evaluation.enterprise_id].prioritization
        ];
      }

      let stateColor = "";
      switch (_.get(officialEvaluations[evaluation.enterprise_id], "status")) {
        case "Approved":
          stateColor = "green-text";
          break;
        case "Declined":
          stateColor = "red-text";
          break;
        default:
          stateColor = "yellow-text";
      }

      const EvaluationResult = utils.getScoreAndAccuracy(
        answer,
        officialAnswer
      );
      const crowdResults = this.getCrowdVotes(
        crowdVotes,
        evaluation.enterprise_id
      );

      return (
        <li>
          <div
            className="row margin-zero collapsible-header"
            style={{ marginLeft: "0px", marginRight: "0px" }}
          >
            <div className="col s2 left">
              {enterprises[evaluation.enterprise_id].name}
            </div>
            <div className="col s2 center">{this.getAverage(answer)}</div>

            <div className="col s2 center">
              {!_.isEmpty(officialAnswer)
                ? this.getAverage(
                    _.concat(
                      crowdResults.impact,
                      crowdResults.model,
                      crowdResults.prioritization
                    )
                  )
                : ""}
            </div>
            <div className="col s2 center">
              {!_.isEmpty(officialAnswer)
                ? this.getAverage(officialAnswer)
                : ""}
            </div>
            <div className={`col s2 center ${stateColor}`}>
              {_.get(officialEvaluations[evaluation.enterprise_id], "status")
                ? officialEvaluations[evaluation.enterprise_id].status
                : "Pending"}
            </div>
            <div className="col s1 center">
              {EvaluationResult ? EvaluationResult.Score : ""}
            </div>
            <div className="col s1 center">
              {EvaluationResult ? EvaluationResult.Accuracy + "%" : ""}
            </div>
          </div>
          <div className="collapsible-body">
            {this.renderAnswers(
              userEvaluations[evaluation.enterprise_id],
              officialEvaluations[evaluation.enterprise_id],
              crowdResults
            )}
          </div>
        </li>
      );
    });
    return content;
  }

  renderAnswers(evaluation, officialEvaluation, crowdResults) {
    return (
      <div>
        <div className="row">
          <div className="col s2 left">Impact</div>
          <div className="col s2 center">{evaluation.impact}</div>
          <div className="col s2 center">
            {officialEvaluation ? this.getAverage(crowdResults.impact) : ""}
          </div>
          <div className="col s2 center">
            {officialEvaluation ? officialEvaluation.impact : ""}
          </div>
          <div className="col s2 center" />
        </div>
        <div className="row">
          <div className="col s2 left">Model</div>
          <div className="col s2 center">{evaluation.model}</div>
          <div className="col s2 center">
            {officialEvaluation ? this.getAverage(crowdResults.model) : ""}
          </div>
          <div className="col s2 center">
            {officialEvaluation ? officialEvaluation.model : ""}
          </div>
          <div className="col s2 center" />
        </div>
        <div className="row">
          <div className="col s2 left">Prioritization</div>
          <div className="col s2 center">{evaluation.prioritization}</div>
          <div className="col s2 center">
            {officialEvaluation
              ? this.getAverage(crowdResults.prioritization)
              : ""}
          </div>
          <div className="col s2 center">
            {officialEvaluation ? officialEvaluation.prioritization : ""}
          </div>
          <div className="col s2 center" />
        </div>
      </div>
    );
  }

  getCrowdVotes(crowdVotes, id) {
    const votes = _.filter(crowdVotes, item => item.enterprise_id == id);
    const impact = this.getValues(votes, "impact");
    const model = this.getValues(votes, "model");
    const prioritization = this.getValues(votes, "prioritization");
    return {
      impact,
      model,
      prioritization
    };
  }

  getAverage(data) {
    const r = _.map(_.compact(data), n => parseInt(n, 10));
    return _.round(_.sum(r) / r.length, 4);
  }
  getValues(data, value) {
    return _.map(data, value);
  }
}

export default VettingHistory;
