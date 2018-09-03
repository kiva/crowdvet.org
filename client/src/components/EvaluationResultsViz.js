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
import LineChart from "./Chart";
import idgen from "./idgen";

class EvaluationResults extends Component {
  constructor(props) {
    super(props);
    const id = this.props.match.params.id;
    this.state = {
      menu: {
        review: { text: "Review", url: `/application/${id}`, active: false },
        evaluation: {
          text: "Evaluation",
          url: `/users/evaluations/${id}`,
          active: false
        },
        results: {
          text: "Results",
          url: `/users/evaluations/results/${id}`,
          active: true
        }
      },
      active: 3
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.fetchEnterprise(this.props.match.params.id);
    this.props.fetchUserEvaluations();
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

    const imgName =
      (enterprise.Sector.image && `/sectors/${enterprise.Sector.image}`) ||
      enterprise.Sector.link;

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
        <div className="image-margin">
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
            <div className="col s6 center">
              <Link to={`/users/evaluations/${evaluation.enterprise_id}`} className="btn button-large btn-results">
                Previous Page
              </Link>
            </div>
            <div className="col s6 center">
              <Link to={"/user"} className="btn button-large btn-results">
                Exit
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderRadios(name, evaluation, choices, question, official) {
    const inputName = official ? `official-${name}` : name;
    const content = _.map(choices, choice => {
      const id = idgen();
      return (
        <div key={idgen()} className="col s2 center">
          <label className="radio-evaluation">
            <input
              id={id}
              name={inputName}
              type="radio"
              checked={
                evaluation[name] == choice.score ? true : false
              }
              disabled={true}
            />
            <label htmlFor={id} id="radio-text">{choice.score}</label>
          </label>
        </div>
      );
    });

    return (
      <div>
          <div className="col s12 question margin-20">{question.text}</div>
        <div className="row">
          {content}
        </div>
      </div>
    );
  }

  renderResults() {
    const { evaluation, officialEvaluation, crowdVotes } = this.props;

    return (
      <div>
        <div className="row">
          {this.renderRadios("impact", evaluation, impactChoices, impactQuestion, false)}
        </div>
        <div className="row">
          <div className="col s12">
            <strong>Your Vote:</strong>
            <p>{evaluation.impact}: {_.mapKeys(impactChoices, "score")[evaluation.impact].text}</p>
          </div>
        </div>
        <div className="row">
          {this.renderRadios("impact", officialEvaluation, impactChoices, "", true)}
        </div>
        <div className="row">
          <div className="col s12">
            <strong>Kiva's Vote:</strong>
            <p>{officialEvaluation.impact}: {_.mapKeys(impactChoices, "score")[officialEvaluation.impact].text}</p>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <strong className="left center-80">Crowd Average:</strong><h4 className="left center-80 no-margin left-15">{getAverage(_.map(crowdVotes, "impact"))}</h4>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col s12">
            <LineChart data={utils.getCrowdVotes(crowdVotes, "impact")} max={crowdVotes.length} chartId={idgen()} />
          </div>
        </div>

        <div className="row">
          {this.renderRadios("model", evaluation, modelChoices, modelQuestion, false)}
        </div>
        <div className="col s12">
          <strong>Your Vote:</strong>
          <p>{evaluation.model}: {_.mapKeys(modelChoices, "score")[evaluation.model].text}</p>
        </div>
        <div className="row">
          {this.renderRadios("model", officialEvaluation, modelChoices, "", true)}
        </div>
        <div className="col s12">
          <strong>Kiva's Vote:</strong>
          <p>{officialEvaluation.model}: {_.mapKeys(modelChoices, "score")[officialEvaluation.model].text}</p>
        </div>
        <div className="col s12">
            <strong className="left center-80">Crowd Average:</strong><h4 className="left center-80 no-margin left-15">{getAverage(_.map(crowdVotes, "model"))}</h4>
        </div>
        <div className="row">
          <div className="col s12">
            <LineChart data={utils.getCrowdVotes(crowdVotes, "model")} max={crowdVotes.length} chartId={idgen()} />
          </div>
        </div>
        <br />
        <div className="row">
          {this.renderRadios("prioritization", evaluation, prioritizationChoices, prioritizationQuestion, false)}
        </div>
        <div className="col s12">
        <strong>Your Vote:</strong>
        <p>{evaluation.prioritization}: {_.mapKeys(prioritizationChoices, "score")[evaluation.prioritization].text}</p>
        </div>
        <div className="row">
          {this.renderRadios("prioritization", officialEvaluation, prioritizationChoices, "", true)}
        </div>
        <div className="row">
          <div className="col s12">
            <strong>Kiva's Vote:</strong>
            <p>{officialEvaluation.prioritization}: {_.mapKeys(prioritizationChoices, "score")[officialEvaluation.prioritization].text}</p>
          </div>
        </div>
        <div className="col s12">
            <strong className="left center-80">Crowd Average:</strong><h4 className="left center-80 no-margin left-15">{getAverage(_.map(crowdVotes, "prioritization"))}</h4>
        </div>
        <div className="row">
          <div className="col s12">
            <LineChart data={utils.getCrowdVotes(crowdVotes, "prioritization")} max={crowdVotes.length} chartId={idgen()}/>
          </div>
        </div>
      </div>
    );
  }
}


function getAverage(data) {
    const r = _.map(_.compact(data), n => parseInt(n, 10));
    return _.round(_.sum(r) / r.length, 4);
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

  const votes = _.filter(crowdVotes, item => item.enterprise_id == ownProps.match.params.id)

  return {
    auth,
    enterprise: enterprises[ownProps.match.params.id],
    evaluation: evaluations[ownProps.match.params.id],
    questions,
    evaluations,
    officialEvaluations,
    officialEvaluation: officialEvaluations[ownProps.match.params.id],
    crowdVotes: votes
  };
}

const impactQuestion =
  {text: "1. Overall, the enterprise has a meaningful impact on low income or excluded communities [strongly disagree - strongly agree] *"}
const modelQuestion =
  {text: "2. Overall, the enterprise has a viable business model [strongly disagree - strongly agree] *"}
  const prioritizationQuestion =
    {text: "3. Overall, Kiva should move forward with this application and submit this loan for crowdfunding [strongly disagree - strongly agree] *"}


const impactChoices = [
  {
    score: 1,
    text:
      "This indicates any social enterprise you feel has negative social impact, or takes advantage of people - either the people it claims to serve, or other parties."
  },
  {
    score: 2,
    text:
      "This company has no discernable social impact at all. Most for-profit companies fall into this category rating."
  },
  {
    score: 3,
    text:
      "This company has one or more of the following: - Questionable social impact; - Social impact based on donations; - Possible social impact that is not integral to the business model."
  },
  {
    score: 4,
    text:
      "The social impact model of this company makes sense, but it is not currently being measured clearly and methodically."
  },
  {
    score: 5,
    text:
      "The social impact model of this company makes sense, and is being measured clearly and methodically."
  },
  {
    score: 6,
    text:
      "The social impact of this company has been documented and tested with a study or similarly rigorous measure, with demonstrated proof. Or, the company is following an established social impact model which has been tested and demonstrated by research."
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
  },
  {
    score: 3,
    text:
      "This company has raised cash capital, but has minimal sales, or questionably low sales volume considering its current lifespan.​"
  },
  {
    score: 4,
    text:
      "This company is on the road to profitability - the business model has clear potential, it seems the only barrier is a current lack of working capital."
  },
  {
    score: 5,
    text:
      "This business does not display robust profits, as it is reinvesting its profit into growth of the company."
  },
  {
    score: 6,
    text:
      "This company is already healthily profitable and sustainable, and has the ability to scale.​"
  },

];

const prioritizationChoices = [
  {
    score: 1,
    text:
      "I really wouldn’t recommend moving forward with this enterprise."
  },
  {
    score: 2,
    text:
      "I don’t like it. It might be profitable, but social impact is questionable; It might have great social impact, but business model has significant holes. I don’t think this is for Kiva."
  },
  {
    score: 3,
    text:
      "I’m not sold on this. This isn’t a clear ‘yes’ for Kiva."
  },
  {
    score: 4,
    text:
      "This sounds suitable for Kiva. I would recommend considering this."
  },
  {
    score: 5,
    text:
      "This sounds mostly great. Only a few minor concerns with business model/social enterprise/other."
  },
  {
    score: 6,
    text:
      "This is a definite yes. If everything checks out, let’s send this to crowdfunding right now."
  }
];
export default connect(mapStateToProps, actions)(EvaluationResults);
