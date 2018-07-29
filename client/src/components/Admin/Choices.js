import { Field } from "redux-form";
import React, { Component } from "react";
import { Datagrid, TextField } from "react-admin";
import a from "axios";
import _ from "lodash";

class Choices extends Component {
  constructor(props) {
    super(props);
    this.state = { questions: "", votes: "" };
  }

  componentDidMount() {
    this.getData();
    this.getVotes();
  }

  async getVotes() {

    const votes = _.mapKeys(this.props.record.Votes, "question_id");

    this.setState({ votes });
  }
  async getData() {
    const questions = await a.get("/api/questions");
    this.setState({ questions });
  }

  renderRadio(field) {
    return (
      <div>
        <div className="col s2">
          <label>
            <input
              question_id={field.question_id}
              id={`answer${field.id}`}
              {...field.input}
              value={field.id}
              type="radio"
              checked={field.checked}
            />
            <span />
          </label>
        </div>
        <div className="col s10" style={{ fontSize: "16px" }}>
          <span>{field.score}</span> {field.text}
        </div>
      </div>
    );
  }

  onHandleChange(e, value) {
    this.setState({
      votes: {
        ...this.state.votes,
        [e.target.attributes.getNamedItem("question_id").value]: {
          answer_id: value
        }
      }
    });
  }

  renderAnswers(id, answers, votes) {
    return _.map(answers, answer => {
      const checked = answer.id == _.get(votes[id], "answer_id") ? true : false;
      return (
        <Field
          key={answer.id}
          name={`question-${id}`}
          question_id={id}
          id={answer.id}
          score={answer.score}
          text={answer.text}
          component={this.renderRadio}
          checked={checked}
          onChange={this.onHandleChange.bind(this)}
        />
      );
    });
  }

  renderQuestions(votes) {
    return _.map(this.state.questions.data, question => {
      return (
        <div className="row">
          <div className="col s6">
            <TextField
              label="Question"
              source="text"
              record={question}
              style={{ fontSize: "16px" }}
            />
          </div>
          <div className="col s6">
            {this.renderAnswers(question.id, question.Answers, votes)}
          </div>
        </div>
      );
    });
  }

  render() {
    if (!this.state.questions) return null;
    if (!this.state.votes) return null;

    return <div>{this.renderQuestions(this.state.votes)}</div>;
  }
}
export default Choices;
