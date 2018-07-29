import { Field } from "redux-form";
import React from "react";

const Radio = props => {
  const required = (message = 'Required') =>
      value => value ? undefined : message;
  const { record } = props;
  const fields = record.Answers.map(answer => {
    return (
      <Field
        key={answer.id}
        name={`question-${record.id}`}
        id={answer.id}
        score={answer.score}
        text={answer.text}
        component={renderRadio}
        validate={required()}
      />
    );
  });

  return <div>{fields}</div>;
};

const renderRadio = field => {
  return (
    <div className="row">
      <div className="col s1">
        <label>
        <input
          name={field.name}
          id={`answer${field.id}`}
          {...field.input}
          value={field.id}
          type="radio"
        />
        <span></span>
      </label>
      </div>
      <div className="col s11" style={{ "fontSize": "16px" }}>
        <span>{field.score}</span> {field.text}
      </div>
    </div>
  );
};
export default Radio;
