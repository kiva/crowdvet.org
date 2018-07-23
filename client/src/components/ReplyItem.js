import React from 'react';

function ReplyItem({reply}) {
  return(
    <div className="row">
    <li className="col s11 offset-s1 grey-background comment-height">
      <span className="comment-height">{reply.text}</span>
    </li>
    </div>
  )
}

export default ReplyItem;
