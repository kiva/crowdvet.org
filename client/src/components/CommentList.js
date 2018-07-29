import React, { Component } from "react";
import * as actions from "../actions";
import { connect } from "react-redux";
import CommentItem from "./CommentItem";
import _ from "lodash";

class CommentList extends Component {
  componentDidMount() {
    window.jQuery(document).ready(function() {
      window.jQuery(".collapsible").collapsible();
    });
  }

  renderComments(comments, user) {
    const content = _.map(comments, comment => {
      return <CommentItem user={user} comment={comment} />;
    });
    return content;
  }

  render() {
    const { comments, user } = this.props;

    return (
      <div className="col s12" id="comments-table">
        <ul className="collapsible">{this.renderComments(comments, user)}</ul>
      </div>
    );
  }
}
export default CommentList;
