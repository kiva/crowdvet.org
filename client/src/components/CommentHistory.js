import React, {Component} from "react";
import CommentItem from "./CommentHistoryItem";
import _ from "lodash";

class CommentHistory extends Component {
  constructor(props) {
    super(props);
    this.state = { show: 3, limit: 3 };
    this.onHandleClick = this.onHandleClick.bind(this);
  }

  render() {
    let hide = "";
    if(_.isEmpty(this.props.comments)) return null
    if (this.props.comments.length == 0) hide = "hide";
    if (Object.keys(this.props.comments).length <= this.state.show) {
      hide = "hide";
    }

    const comments = _.slice(_.values(this.props.comments),0, this.state.show);

    return (
      <div className="row">
        <div className="col s12">
          <h4 className="center">Your Comment History</h4>
        </div>
        {renderComments(comments, this.props.enterprises)}
        <div className={`col s12 m8 offset-m2 gray-background center ${hide}`}><a onClick={this.onHandleClick}className="btn-flat">Load More</a></div>
        <div className="col s12">
          <h4 className="center">Certificates History</h4>
        </div>
      </div>
    );
  }

  onHandleClick(e) {
    e.preventDefault();
    const show = this.state.show + this.state.limit;
    this.setState({ show });
  }
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

export default CommentHistory;
