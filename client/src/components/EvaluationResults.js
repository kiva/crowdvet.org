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
import utils from "./utils";
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
    this.props.fetchUserEvaluation(this.props.match.params.id);
    this.props.fetchOfficialEvaluations();
  }

  onSubMenuChange = (menu, active) => {
    this.setState({ menu, active });
  };

  renderMessage() {
    const { enterprise } = this.props;
    const imgName =
      (enterprise.Sector.image && `/sectors/${enterprise.Sector.image}`) ||
      enterprise.Sector.link;

    return (
      <div>
        <TopMenu onSubMenuChange={this.onSubMenuChange} />
        <div className="image-margin">
          <div className="row">
            <div className="col s12 center img-header">
              <h2 id="title-img" className="center">
                {enterprise.name}
                <h3><Countdown date={enterprise.endDate} renderer={utils.timeRenderer} /></h3>
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
          <div className="row center">
            <div className="col s10 offset-s1">
              <h4>
                Results visible only after you complete the evaluation for this
                enterprise.
                <br /><br /> Please go to the evaluation page to vote.
                <br/><br /> Once the vetting period ends, you can see how your score compares to the crowd and
                Kiva’s scores.
              </h4>
            </div>
          </div>
          <div className="row">
            <div className="col s12 m4 offset-m4 center">
              <Link
                to={`/users/evaluations/${this.props.match.params.id}`}
                className="btn button-large btn-results"
              >
                Evaluate
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { auth, enterprise, evaluation, officialEvaluation } = this.props;
    if (!auth) return null;
    if (!enterprise) return null;
    if (!evaluation) return this.renderMessage();

    const imgName =
      (enterprise.Sector.image && `/sectors/${enterprise.Sector.image}`) ||
      enterprise.Sector.link;

    const message = utils.getMessage(
      enterprise,
      evaluation,
      officialEvaluation
    );
    return (
      <div>
        <TopMenu onSubMenuChange={this.onSubMenuChange} />
        <div className="image-margin">
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
          <KivaMessage
            message={message.message}
            description={message.description}
          />
          <div className="row">{this.renderEvaluation()}</div>
          <div className="row">
            <div className="col s6 center">
              <Link
                to={`/users/evaluations/${this.props.match.params.id}`}
                className="btn button-large btn-results"
              >
                Previous Page
              </Link>
            </div>
            <div className="col s6 center">
              <Link to={message.page} className="btn button-large btn-results">
                {message.text}
              </Link>
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
      const id = idgen();
      return (
        <div key={idgen()} className="col s12 m2 center">
          <label className="radio-evaluation">
            <input
              id={id}
              name={name}
              type="radio"
              checked={
                this.props.evaluation[name] == choice.score ? true : false
              }
              disabled={true}
            />
            <label htmlFor={id} id="radio-text">
              {choice.score}
            </label>
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
    let text = "";
    return (
      <div>
        <div className="row">
          {this.renderRadios("impact", impactChoices, impactQuestion)}
        </div>
        <div className="row">
          <div className="col s12">
            <p>
              {evaluation.impact}:{" "}
              {_.mapKeys(impactChoices, "score")[evaluation.impact].text}
            </p>
          </div>
          <div className="col s12">
            <p>
              <input
                disabled={true}
                type="text"
                value={evaluation.impactComment}
              />
            </p>
          </div>
        </div>
        <div className="row">
          {this.renderRadios("model", modelChoices, modelQuestion)}
        </div>
        <div className="row">
          <div className="col s12">
            <p>
              {evaluation.model}:{" "}
              {_.mapKeys(modelChoices, "score")[evaluation.model].text}
            </p>
          </div>
          <div className="col s12">
            <p>
              <input
                disabled={true}
                type="text"
                value={evaluation.modelComment}
              />
            </p>
          </div>
        </div>
        <div className="row">
          {this.renderRadios(
            "prioritization",
            prioritizationChoices,
            prioritizationQuestion
          )}
        </div>
        <div className="row">
          <div className="col s12">
            <p>
              {evaluation.prioritization}:{" "}
              {
                _.mapKeys(prioritizationChoices, "score")[
                  evaluation.prioritization
                ].text
              }
            </p>
          </div>
          <div className="col s12">
            <p>
              <input
                disabled={true}
                type="text"
                value={evaluation.prioritizationComment}
              />
            </p>
          </div>
        </div>
        <div className="row">
          <div className="question">
            4. What else should Kiva know about this enterprise?
          </div>
          <div className="col s12 answer-result">
            <p>
              <input disabled={true} type="text" value={evaluation.comment} />
            </p>
          </div>
        </div>
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

const impactQuestion = {
  text:
    "1. Overall, the enterprise has a meaningful impact on low income or excluded communities [strongly disagree - strongly agree] *"
};
const modelQuestion = {
  text:
    "2. Overall, the enterprise has a viable business model [strongly disagree - strongly agree] *"
};
const prioritizationQuestion = {
  text:
    "3. Overall, Kiva should move forward with this application and submit this loan for crowdfunding [strongly disagree - strongly agree] *"
};

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
  }
];

const prioritizationChoices = [
  {
    score: 1,
    text: "I really wouldn’t recommend moving forward with this enterprise."
  },
  {
    score: 2,
    text:
      "I don’t like it. It might be profitable, but social impact is questionable; It might have great social impact, but business model has significant holes. I don’t think this is for Kiva."
  },
  {
    score: 3,
    text: "I’m not sold on this. This isn’t a clear ‘yes’ for Kiva."
  },
  {
    score: 4,
    text: "This sounds suitable for Kiva. I would recommend considering this."
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
