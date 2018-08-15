import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import * as actions from "../actions";
import { connect } from "react-redux";

class UserMessage extends Component {
  constructor(props) {
    super(props);
    this.state = { disabled: true };
    //bind the context
    this.handleEdit = this.handleEdit.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  //bind the context or replace this function with an arrow function
  handleEdit(event) {
    event.preventDefault();
    this.setState({ disabled: !this.state.disabled });
  }

  //fetch data
  onFormSubmit(values) {
    this.props.updateUser(values);
    this.setState({ disabled: true });
  }

  render() {
    const { handleSubmit } = this.props;
    const hide = this.state.disabled ? "hide" : "";
    const show = this.state.disabled ? "" : "hide";
    return (
      <div className="row center-align" id="user-container">
        <div className="col s10 l6 offset-s1 offset-l3" id="user-title">
          I'm here to help enable dreams because...
        </div>
        <div className="row">
          <div className="col s10 l8 offset-s1 offset-l2">
            <p className={show} id="user-msg">
              {this.props.message}
            </p>
            <p>
              <form onSubmit={handleSubmit(this.onFormSubmit)}>
                <Field
                  style={{ color: "white", fontSize:"18px"}}
                  name="message"
                  className={hide}
                  placeholder="Type your message here"
                  disabled={this.state.disabled}
                  component="input"
                />
              </form>
            </p>
            <a className="white-opacity" href="" onClick={this.handleEdit}>
              <i className="material-icons ">edit</i>
              <p className="white-opacity">EDIT MESSAGE</p>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(null, actions)(
  reduxForm({ form: "userMessageForm" })(UserMessage)
);
