import React from "react";
import "./CommentHistory.css";
import moment from 'moment';

export default ({ comment, enterprise }) => {
  return (
    <div className="col s12 m8 offset-m2 gray-background">
      <p>{comment.comment_id ? getReplied(enterprise) : getCommented(enterprise)}</p>
      <p>{comment.text}</p>
      <p className="grey-text">{moment(comment.created_at).format("MMMM DD, YYYY")}</p>
    </div>
  );
};
function getCommented(enterprise) {
  return (
    <div>
      <span className="green-bold-text">Commented</span> on{" "}
      <span className="green-bold-text">{enterprise.name}</span>
    </div>
  );
}

function getReplied(enterprise) {
  return (
    <div>
      <span className="green-bold-text">Replied</span> to a
      <span className="green-bold-text"> comment </span>
       on <span className="green-bold-text">{enterprise.name}</span>
    </div>
  );
}
