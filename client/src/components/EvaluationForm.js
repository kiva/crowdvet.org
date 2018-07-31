import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import QuestionList from "./QuestionList";
import * as actions from "../actions";
import _ from "lodash";
import { submit } from "redux-form";
import idgen from './idgen';

class EvaluationForm extends Component {
  renderTextArea = field => {
    return (
      <div>
        <textarea
          className="materialize-textarea"
          name={field.name}
          placeholder={field.placeholder}
          {...field.input}
          type="text"
        />
        <label htmlFor={field.id} />
      </div>
    );
  };
  componentDidMount() {
    console.log(this.props.enterprise_id,"prop")
    this.props.fetchUserEvaluation(this.props.enterprise_id);
  }
  handleFormSubmit(votes) {
    console.log("values", votes);
    const data = {
      votes,
      enterprise_id: this.props.enterprise_id,
      inProgress: false
    };
    this.props.Evaluate(data, this.props.history);
  }

  handleChange(votes) {
    const data = {
      votes,
      enterprise_id: this.props.enterprise_id,
      inProgress: true
    };
    this.props.Evaluate(data);
  }

  renderRadios(name, choices, question) {
    const content = _.map(choices, choice => {
      return (
        <div key={idgen()} className="row">
          <div className="col s12 m1 center">
            <label className="radio-evaluation">
              <Field
                name={name}
                component="input"
                type="radio"
                value={`${choice.score}`}
                text={choice.text}
              />
              <span id="radio-text">{choice.score}</span>
            </label>
          </div>
          <div className="col s11 response">{choice.text}</div>
        </div>
      );
    });

    return (
      <div>
        <div className="row">
            <div className="question">{question.text}</div>
        </div>
        {content}
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form
        onChange={() =>
          setTimeout(
            handleSubmit(params => this.handleChange.bind(this)(params))
          )
        }
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
      >
        {this.renderRadios("impact", impactChoices, impactQuestion)}
        {this.renderRadios("model", modelChoices, modelQuestion)}
        <div className="col s12 m6 offset-m3">
          <button className="btn button-large">Submit Evaluation</button>
        </div>
      </form>
    );
  }
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

function mapStateToProps({ questions, enterprises, evaluations }, ownProps) {
  const evaluation = evaluations[ownProps.enterprise_id]

  const initialValues = evaluation ?  {impact: evaluation.impact, model: evaluation.model} : {}

  return {
    questions,
    enterprise: enterprises[ownProps.enterprise_id],
    evaluation: evaluations[ownProps.enterprise_id],
  };
}

export default connect(mapStateToProps, actions)(
  reduxForm({ form: "vetform" })(EvaluationForm)
);
