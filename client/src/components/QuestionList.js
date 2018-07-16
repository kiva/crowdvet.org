import React from 'react';
import AnswersList from './AnswersList';
import { Field } from 'redux-form';
import _ from 'lodash';

const QuestionList = ({ questions, renderTextArea }) => {
  const content = _.map(questions, question => {
    return (
      <div key={question.id}>
        <div className="col s12 m10 offset-m1 question">{question.text}</div>
        <AnswersList
          answers={question.Answers}
          renderTextArea={renderTextArea}
          question_id={question.id}
        />
      </div>
    );
  });
  return (
    <div>{content}</div>
  )
};

export default QuestionList;
