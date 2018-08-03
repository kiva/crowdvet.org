import React, { Component } from "react";
import {Input} from "react-materialize"

class Sort extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const $ = window.jQuery;
    $(document).ready(function() {
      $('select').material_select();
    });
  }

  handleChange(event) {
    this.props.sort(event.target.value);
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div className="input-field">
        <Input value={this.state.value} s={12} type='select' onChange={this.handleChange} >
            <option value="" disabled>
              Sort by...
            </option>
            <option value="name">Borrower</option>
            <option value="country">Country</option>
            <option value="sectors">Primary Sector</option>
            <option value="endDate">End Date</option>
         </Input>
      </div>
    );
  }
}



export default Sort;
