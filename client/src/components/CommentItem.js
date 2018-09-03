import React, { Component } from "react";
import { connect } from "react-redux";
import ReplyForm from "./ReplyForm";
import ReplyItem from "./ReplyItem";
import _ from "lodash";
import heart from "./heart.svg";
import heartGrey from "./heart-grey.svg";
import reply from "./reply.svg";
import * as actions from "../actions";
import moment from "moment";

function renderReplies(replies) {
  return _.map(replies, reply => {
    return (
      <ReplyItem reply={reply} user={reply.User} date={reply.created_at} />
    );
  });
}

class CommentItem extends Component {
  constructor(props) {
    super(props);
    this.state = { hidden: true };
    this.onDeleteComment = this.onDeleteComment.bind(this);
  }

  onHandleClick() {
    this.setState({ hidden: !this.state.hidden });
  }

  onHandleVote() {
    const { id } = this.props.comment;
    const vote = !this.state.vote;
    this.props.VoteComment({ id, vote });
  }

  onDeleteComment() {
    const { id } = this.props.comment;
    this.props.deleteComment(id)
  }
  render() {
    const { comment, user } = this.props;

    const userVotes = _.mapKeys(comment.CommentVotes, "user_id");
    const heartImg = userVotes[user.id] ? heart : heartGrey;

    const hide = this.state.hidden ? "hide" : "";
    const deleteBtn = user.id === comment.User.id ? <button onClick={this.onDeleteComment} className="btn-flat">Delete</button> : "";
    return (
      <li>
        <div className="row collapsible-header grey-background comment-height">
          <div className="col s1 comment-votes center">
            <div style={{ fontSize: "20px" }}>
              {comment.CommentVotes ? comment.CommentVotes.length : 0}
            </div>
            <span>Votes</span>
          </div>
          <div className="col s11">{comment.text}</div>
        </div>
        <div className="collapsible-body">
          <div className="row grey-background">
            <div className="col s2">
              <p>
                <img
                  className="circle responsive-img"
                  src={comment.User.image}
                  style={{ maxWidth: "50px" }}
                />
              </p>
              <p className="comment-height">{comment.User.name}</p>
            </div>
            <div className="col s8 grey-background">
              <p className="comment-height">{comment.text}</p>
            </div>
            <div className="col s2 grey-background">
              <p className="comment-height">
                {moment(comment.created_at).format("MMMM DD, YYYY")}
              </p>
            </div>
            <div className="col s12 grey-background" id="comment-icons">
              <div
                onClick={this.onHandleVote.bind(this)}
                className="col s12 m1"
              >
                <img src={heartImg} />
              </div>
              <div
                onClick={this.onHandleClick.bind(this)}
                className="col s12 m1"
              >
                <img src={reply} />
              </div>
              <div className="col s12 m1 offset-m8">
                {deleteBtn}
              </div>
            </div>
          </div>

          <div>
            <ReplyForm
              hide={hide}
              id={comment.id}
              enterprise_id={comment.enterprise_id}
            />
          </div>
          <ul>{comment.Replies ? renderReplies(comment.Replies) : ""}</ul>
        </div>
      </li>
    );
  }
}

export default connect(null, actions)(CommentItem);
