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
          <div className="row">{this.renderResults()}</div>
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

  renderResults() {
    const content = _.map(this.props.questions, question => {
      return (
        <div className="row">
          <div className="question">{question.text}</div>
          {this.renderAnswers(question, question.Answers)}
        </div>
      );
    });
    return content;
  }

  renderAnswers(question, answers) {
    const { evaluation } = this.props;
    const votes = _.get(evaluation, "Votes");
    let text = "";
    const content = _.map(answers, answer => {
      const v = _.mapKeys(votes, "question_id");
      const checked = answer.id == _.get(v[question.id],"answer_id") ? true : false;
      answer.id == _.get(v[question.id],"answer_id") ? (text = answer.text) : null;
      return (
        <div>
          <div className="col s2">
            <p><label>
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
export default connect(mapStateToProps, actions)(EvaluationResults);
