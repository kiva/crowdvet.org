import React, { Component } from "react";
import {connect} from "react-redux";
import ReplyForm from "./ReplyForm";
import ReplyItem from "./ReplyItem";
import _ from "lodash";
import heart from "./heart.svg";
import heartGrey from "./heart-grey.svg";
import reply from "./reply.svg";
import * as actions from "../actions";


function renderReplies(replies) {
  return _.map(replies, reply => {
    return <ReplyItem reply={reply} />;
  });
}

class CommentItem extends Component {
  constructor(props) {
    super(props);
    this.state = { hidden: true };
  }

  onHandleClick() {
    this.setState({ hidden: !this.state.hidden });
  }

  onHandleVote() {
    const { id } = this.props.comment;
    const vote = !this.state.vote;
    this.props.VoteComment({ id, vote})

  }
  render() {
    const { comment, user } = this.props;

    const userVotes = _.mapKeys(comment.CommentVotes, "user_id");
    const heartImg = userVotes[user.id] ? heart : heartGrey;

    const hide = this.state.hidden ? "hide" : "";

    return (
      <li>
        <div className="row collapsible-header grey-background comment-height">
          <div className="col s1 comment-votes center">{comment.CommentVotes ? comment.CommentVotes.length : 0} Votes</div>
          <div className="col s11">{comment.text}</div>
        </div>
        <div className="collapsible-body">
          <div className="row grey-background" id="comment-icons">
            <div onClick={this.onHandleVote.bind(this)} className="col s12 m1">
              <img src={heartImg} />
            </div>
            <div onClick={this.onHandleClick.bind(this)} className="col s12 m1">
              <img src={reply} />
            </div>
          </div>
          <div>
            <ReplyForm hide={hide} id={comment.id} enterprise_id={comment.enterprise_id} />
          </div>
          <ul>{comment.Replies ? renderReplies(comment.Replies) : ""}</ul>
        </div>
      </li>
    );
  }
}

export default connect(null, actions)(CommentItem);
