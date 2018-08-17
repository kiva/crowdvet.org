import React from "react";
import CommentItem from "./CommentHistoryItem";
import _ from "lodash";

export default props => {
  return (
    <div className="row">
      <div className="col s12">
        <h4 className="center">Your Comment History</h4>
      </div>
      {renderComments(props.comments, props.enterprises)}
      <div className="col s12">
        <h4 className="center">Certificates History</h4>
      </div>
    </div>
  );
};

function renderComments(comments, enterprises) {
  if (_.isEmpty(comments) || _.isEmpty(enterprises)) {
    return <h5 className="center">There are no comments.</h5>
  }

  return _.map(comments, comment => {
    return (
      <div className="row">
        <CommentItem comment={comment} enterprise={enterprises[comment.enterprise_id]}/>
      </div>
    );
  });
}
