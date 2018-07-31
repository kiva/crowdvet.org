import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../actions";
import SubMenu from "./SubMenu";
import TopMenu from "./TopMenu";
import KivaMessage from "./KivaMessage";
import _ from "lodash";
import moment from "moment";
import Countdown from "react-countdown-now";
import utils from './utils'
import idgen from './idgen';

class EvaluationResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: { 1: "Review", 2: "Evaluation", 3: "Results" },
      active: 1
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.fetchEnterprise(this.props.match.params.id);
    this.props.fetchUserEvaluation(this.props.match.params.id);
    this.props.fetchOfficialEvaluations();
    this.props.fetchQuestions();
  }

  onSubMenuChange = (menu, active) => {
    this.setState({ menu, active });
  };

  render() {
    const { auth, questions, enterprise, evaluation, officialEvaluation } = this.props;
    if (!auth) return null;
    if (!enterprise) return null;
    if (!evaluation) return null;

    this.sector = enterprise.Sector ? enterprise.Sector.name : "Water";
    const imgName = `/sectors/${this.sector}.jpg`;
    const message = utils.getMessage(enterprise, evaluation, officialEvaluation);
    return (
      <div>
        <TopMenu onSubMenuChange={this.onSubMenuChange} />
        <div style={{ marginBottom: "-25px" }}>
          <div className="row">
            <div className="col s12 center img-header">
              <h2 id="title-img" className=" center">
                {enterprise.name}
                <h3>{this.renderCountDown(enterprise, evaluation)}</h3>
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
          <KivaMessage message={message.message}/>
          <div className="row">{this.renderEvaluation()}</div>
          <div className="row">
            <div className="col s6">
              <Link to={"/user"} className="btn button-large btn-results">Previous Page</Link>
            </div>
            <div className="col s6">
              <Link to={message.page} className="btn button-large btn-results">{message.text}</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderCountDown(enterprise, evaluation) {
    if (!utils.isOpen(enterprise) && !_.isEmpty(evaluation)) {
      return (
        <div>
          Vetted {moment(evaluation.created_at).format("MMMM DD, YYYY")}
        </div>
      );
    }

    return (
      <Countdown date={enterprise.endDate} renderer={utils.timeRenderer} />
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
                checked={this.props.evaluation[name] == choice.score ? true : false}
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
        {content}
      </div>
    );
  }

  renderEvaluation() {
    const { evaluation } = this.props;
    let text = ""
    return (
      <div>
        <div>
          <div  className="row">
          {this.renderRadios("impact", impactChoices, impactQuestion)}
          </div>
          <div  className="row">
          {this.renderRadios("model", modelChoices, modelQuestion)}
          </div>
        </div>
        <div className="col s12 answer-result"><p>{text}</p></div>
      </div>
    );
  }
}

function mapStateToProps(
  { auth, enterprises, questions, evaluations, officialEvaluations },
  ownProps
) {
  return {
    auth,
    enterprise: enterprises[ownProps.match.params.id],
    evaluation: evaluations[ownProps.match.params.id],
    officialEvaluation: officialEvaluations[ownProps.match.params.id],
    questions
  };
}

const impactQuestion =
  {text: "1. Overall, the enterprise has a meaningful impact on low income or excluded communities [strongly disagree - strongly agree] *"}
const modelQuestion =
  {text: "2. Overall, the enterprise has a viable business model [strongly disagree - strongly agree] *"}
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
