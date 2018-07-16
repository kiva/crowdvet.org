import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Field, reduxForm, initialize } from "redux-form";
import QuestionList from "./QuestionList";
import * as actions from "../actions";
import _ from "lodash";
import { submit } from 'redux-form'

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

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onChange={() => setTimeout(handleSubmit(params => this.handleChange.bind(this)(params)))}
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <QuestionList
          questions={this.props.questions}
          renderTextArea={this.renderTextArea}
        />
        <div className="col s12 m6 offset-m3">
          <button className="btn button-large">Submit Evaluation</button>
        </div>
      </form>
    );
  }
}

function mapStateToProps({ questions, enterprises, evaluations }, ownProps) {
  let votes = _.get(evaluations[ownProps.enterprise_id], 'Votes');

   votes = _.reduce(votes, (reduced, v) => {
     reduced[v.question_id] = {
         answer: v.answer_id.toString(),
         comment: v.comment
     }
       return reduced;
   }, [])

  return {
    questions,
    enterprise: enterprises[ownProps.enterprise_id],
    evaluation: evaluations[ownProps.enterprise_id],
    initialValues: {
      votes
    }
  };
}

export default connect(mapStateToProps, actions)(
  reduxForm({ form: "vetform"})(EvaluationForm)
);
