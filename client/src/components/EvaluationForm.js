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
    this.props.fetchUserEvaluation(this.props.enterprise_id);
  }
  handleFormSubmit(votes) {
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
      const id = idgen();
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
                id={id}
              />
              <label htmlFor={id} id="radio-text">{choice.score}</label>
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
        {this.renderRadios("prioritization", prioritizationChoices, prioritizationQuestion)}
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
  const prioritizationQuestion =
    {text: "3. Overall, Kiva should move forward with this application and submit this loan for crowdfunding [strongly disagree - strongly agree] *"}


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
      "This business does not display robust profits, as it is reinvestmenting its profit into growth of the company."
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
