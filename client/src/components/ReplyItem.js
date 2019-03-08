import React from 'react';
import moment from 'moment';

function ReplyItem({reply, date, user}) {
  return(
    <div className="row grey-background">
    <li className="col s2 grey-background">
      <p><img alt="user" className="circle responsive-img" src={user.image} style={{maxWidth:"50px"}}/></p>
      <p className="comment-height">{user.name}</p>
    </li>
    <li className="col s8 grey-background">
      <p className="comment-height">{reply.text}</p>
    </li>
    <li className="col s2 grey-background">
      <p className="comment-height">{moment(date).format("MMMM DD, YYYY")}</p>
    </li>
    </div>
  )
}

export default ReplyItem;
