import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import * as actions from "../actions";
import SubMenu from "./SubMenu";
import TopMenu from "./TopMenu";
import KivaMessage from "./KivaMessage";
import _ from "lodash";
import moment from "moment";
import utils from "./utils";
import {
  Sparklines,
  SparklinesLine,
  SparklinesSpots,
  SparklinesCurve,
  SparklinesReferenceLine
} from "react-sparklines";
import LineChart from "./Chart";
import idgen from "./idgen";

class EvaluationResults extends Component {
  constructor(props) {
    super();
    this.state = {
      menu: { 1: "Review", 2: "Evaluation", 3: "Results" },
      active: 1
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.fetchEnterprise(this.props.match.params.id);
    this.props.fetchUserEvaluations();
    this.props.fetchQuestions();
    this.props.fetchOfficialEvaluations();
    this.props.fetchCrowdVotes();
  }

  onSubMenuChange = (menu, active) => {
    this.setState({ menu, active });
  };

  renderTable(result, evaluationResult) {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th />
              <th>Score</th>
              <th>Accuracy</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <th>This Enterprise</th>
              <td>
                <h4>{evaluationResult ? evaluationResult.Score : ""}</h4>
              </td>
              <td>
                <h4>{evaluationResult ? evaluationResult.Accuracy : ""}%</h4>
              </td>
            </tr>
            <tr>
              <th>Overall</th>
              <td>
                <h4>{result ? result.GeneralScore : ""}</h4>
              </td>
              <td>
                <h4>{result ? result.GeneralAccuracy : ""}%</h4>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    const {
      auth,
      questions,
      enterprise,
      officialEvaluation,
      officialEvaluations,
      evaluation,
      evaluations
    } = this.props;
    // redirect user if not logged
    if (!auth) return null;
    if (!enterprise) return null;
    if (!officialEvaluation) return null;

    const result = utils.getOverallResults(evaluations, officialEvaluations);

    const votes = [
      evaluation.model,
      evaluation.prioritization,
      evaluation.impact
    ];
    const officialVotes = [
      officialEvaluation.model,
      officialEvaluation.prioritization,
      officialEvaluation.impact
    ];
    const evaluationResult = utils.getScoreAndAccuracy(votes, officialVotes);

    this.sector = enterprise.Sector ? enterprise.Sector.name : "Water";
    const imgName = `/sectors/${this.sector}.jpg`;
    const message = `KIVA ${officialEvaluation.status.toUpperCase()} THIS LOAN`;
    let background;
    switch (officialEvaluation.status) {
      case "Approved":
        background = "background-approved";
        break;
      case "Declined":
        background = "background-declined";
    }
    return (
      <div>
        <TopMenu onSubMenuChange={this.onSubMenuChange} />
        <div style={{ marginBottom: "-25px" }}>
          <div className="row">
            <div className="col s12 center img-header">
              <h2 id="title-img" className=" center">
                {enterprise.name}
              </h2>
            </div>
            <img
              className="responsive-img img-pic"
              src={imgName}
              width="100%"
              alt=""
            />
          </div>
        </div>
        <div className="row flow-text dashboard">
          <SubMenu menu={this.state.menu} />
        </div>
        <div className="container">
          <div className="row flow-text center">
            <h3 className="col s12">Evaluation Results</h3>
          </div>
          <KivaMessage message={message} background={background} />
          <div className="row">
            {this.renderTable(result, evaluationResult)}
          </div>

          <div className="row">{this.renderResults()}</div>
          <div className="row">
            <div className="col s6">
              <Link to={"/user"} className="btn button-large btn-results">
                Previous Page
              </Link>
            </div>
            <div className="col s6">
              <Link to={"/user"} className="btn button-large btn-results">
                Exit
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderRadios(name, choices, question) {
    const content = _.map(choices, choice => {
      return (
        <div key={idgen()} className="col s12 m2 center">
          <label className="radio-evaluation">
            <input
              name={name}
              type="radio"
              checked={
                this.props.evaluation[name] == choice.score ? true : false
              }
              disabled={true}
            />
            <span id="radio-text">{choice.score}</span>
          </label>
        </div>
      );
    });

    return (
      <div>
        <div>
          <div className="question">{question.text}</div>
        </div>
        <div className="row">
          {content}
        </div>
        <div className="row">
          <div className="col s12">
            <LineChart />
          </div>
        </div>
      </div>
    );
  }

  renderResults() {
    return (
      <div className="row">
        <div className="row">
          {this.renderRadios("impact", impactChoices, impactQuestion)}
        </div>
        <div className="row">
          {this.renderRadios("model", modelChoices, modelQuestion)}
        </div>
      </div>
    );
  }

  renderAnswers(question, answers) {
    const { evaluation } = this.props;
    const votes = _.get(evaluation, "Votes");
    let text = "";
    const content = _.map(answers, answer => {
      const v = _.mapKeys(votes, "question_id");
      const checked =
        answer.id == _.get(v[question.id], "answer_id") ? true : false;
      answer.id == _.get(v[question.id], "answer_id")
        ? (text = answer.text)
        : null;
      return (
        <div>
          <div className="col s2">
            <p>
              <label>
                <input
                  name={question.id.toString()}
                  type="radio"
                  checked={checked}
                  disabled={true}
                />
                <span id="radio-text">{answer.score}</span>
              </label>
            </p>
          </div>
        </div>
      );
    });
    return (
      <div>
        {content}
        <div className="col s12 answer-result">
          <p>{text}</p>
        </div>
        <div className="col s12">
          <LineChart />
        </div>
      </div>
    );
  }
}

function mapStateToProps(
  {
    auth,
    enterprises,
    questions,
    evaluations,
    officialEvaluations,
    crowdVotes
  },
  ownProps
) {
  console.log(questions, "con q");
  console.log(crowdVotes, "en votes");
  const initial = _.reduce(
    questions,
    (result, q) => {
      const withCount = _.map(q.Answers, answer => {
        return { ...answer, count: 0 };
      });
      const answers = _.mapKeys(withCount, "id");
      return { ...result, [q.id]: answers };
    },
    {}
  );

  const r = _.reduce(
    crowdVotes,
    (result, evaluation) => {
      if (evaluation.enterprise_id === ownProps.match.params.id) {
        _.map(evaluation.Votes, vote => {
          result[vote.question_id][vote.answer_id].count =
            result[vote.question_id][vote.answer_id].count + 1;
        });
      }
      return result;
    },
    initial
  );

  console.log(r, "en result");
  return {
    auth,
    enterprise: enterprises[ownProps.match.params.id],
    evaluation: evaluations[ownProps.match.params.id],
    questions,
    evaluations,
    officialEvaluations,
    officialEvaluation: officialEvaluations[ownProps.match.params.id],
    crowdVotes: crowdVotes[ownProps.match.params.id]
  };
}

const impactQuestion = {
  text:
    "1. Overall, the enterprise has a meaningful impact on low income or excluded communities [strongly disagree - strongly agree] *"
};
const modelQuestion = {
  text:
    "2. Overall, the enterprise has a viable business model [strongly disagree - strongly agree] *"
};
const impactChoices = [
  {
    score: 1,
    text:
      "This company has no discernable social impact at all. Most for-profit companies fall into this category rating."
  },
  {
    score: 2,
    text:
      "This company has no discernable social impact at all. Most for-profit companies fall into this category rating."
  }
];

const modelChoices = [
  {
    score: 1,
    text:
      "This business is not making money. It is dependant on donations and grants.​"
  },
  {
    score: 2,
    text:
      "This business has some income, but is mostly dependent on grants and donations, somewhere around a 20:80 ratio."
  }
];
export default connect(mapStateToProps, actions)(EvaluationResults);
