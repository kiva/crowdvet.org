import React, { Component } from "react";
import * as actions from "../actions";
import { connect } from "react-redux";
import "./Comment.css";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(event) {
    event.preventDefault();
    const text = this.state.text;
    const id = this.props.enterprise_id;
    this.props.createComment({ text, id });
    this.setState({ text: "" });
  }

  onInputChange(event) {
    this.setState({ text: event.target.value });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <textarea
            id="textarea1"
            value={this.state.text}
            placeholder="Type your question here..."
            onChange={this.onInputChange}
            className="materialize-textarea"
            style={{ minHeight: "100px" }}
          />

          <div className="row">
            <div className="col s12 m4 offset-m8">
              <button className="btn btn-comment">Submit</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default connect(null, actions)(Comment);
