import React from "react";
import "./CommentHistory.css";

export default ({ comment, enterprise }) => {
  return (
    <div className="col s12 m8 offset-m2 gray-background">
      <p>{comment.comment_id ? getReplied(enterprise) : getCommented(enterprise)}</p>
      <p>{comment.text}</p>
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
