import React from "react";
import * as actions from "../actions";
import { connect } from "react-redux";

export class ResetPass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "hide"
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.password.value !== this.confirmpass.value) {
      this.setState({ error: "Passwords don't match" });
    } else {
      this.setState({ error: "hidden" });
      let formData = {
        resetPassLink: this.props.match.params.id,
        newPassword: this.password.value
      };
      this.props.dispatch(actions.resetPassword(formData));
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
        <div className="col s12 center bold"><h3>Reset Your Password</h3></div>
        </div>
        <div className="row">
        <div className="col s12 m6 offset-m3">
        <form>
          <label htmlFor="new-password">Password</label>
          <input
            type="password"
            id="new-password"
            ref={ref => (this.password = ref)}
            placeholder="New Password"
          />
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            ref={ref => (this.confirmpass = ref)}
            placeholder="Confirm Password"
          />
          <div className={this.state.error}>
            Passwords dont match. Please try again.
          </div>
          <div className="col s12 center">
          <a type="submit" onClick={this.onSubmit} className="btn-flat learn-more-btn">
            Submit
          </a>
          </div>
        </form>
        </div>
        </div>
      </div>
    );
  }
}
export default connect()(ResetPass);
