import React, { Component } from "react";

class Sort extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const $ = window.jQuery;
    $(document).ready(function() {
      $("select").formSelect();
    });
  }

  handleChange(event) {
    this.props.sort(event.target.value);
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div className="input-field">
        <select value={this.state.value} onChange={this.handleChange}>
          <option value="" disabled>
            Sort by...
          </option>
          <option value="name">Borrower</option>
          <option value="country">Country</option>
          <option value="sectors">Primary Sector</option>
          <option value="endDate">End Date</option>
        </select>
        {this.state.value}
      </div>
    );
  }
}

export default Sort;
