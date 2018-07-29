import React, { Component } from "react";

class Sort extends Component {
  componentDidMount() {
    const $ = window.jQuery;
    $(document).ready(function(){
    $('select').formSelect();
  });

  }
  onChange() {

    //this.props.sort()
  }
  render() {
    return (
      <div className="input-field">
        <select>
          <option value="" disabled selected>
            Sort by...
          </option>
          <option value="name">Borrower</option>
          <option value="country">Country</option>
          <option value="sectors">Primary Sector</option>
          <option value="endDate">End Date</option>
        </select>

      </div>
    );
  }
}

export default Sort;
