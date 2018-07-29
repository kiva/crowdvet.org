import React from 'react';
import { Field } from 'redux-form';
import _ from 'lodash';

const AnswersList = ({ answers, renderTextArea, question_id }) => {
  const content = _.map(answers, answer => {
    return (
      <li key={answer.id}>
      <div className="row">
        <div className="col s12 m1 center">
        <p style={{marginTop:"auto"}}>
        <label className="radio-evaluation">
          <Field name={`votes[${question_id.toString()}].answer`} component="input" type="radio" value={answer.id.toString()} />{" "}
          <span id="radio-text">{answer.score}</span>
        </label>
        </p>
        </div>
        <div className="col s11">
        {answer.text}
        </div>
      </div>
    </li >);
  });

  return (
    <div className="col s10 push-s1">
      <ul className="response flow-text">
      {content}
      </ul>
      <Field name={`votes[${question_id.toString()}].comment`} placeholder="Leave your comment here"
      component={renderTextArea} />
    </div>
  )
};
export default AnswersList;
