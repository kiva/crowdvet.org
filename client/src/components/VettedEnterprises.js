import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../actions";
import _ from "lodash";
import VettedEnterpriseItem from "./VettedEnterpriseItem";
import "./Enterprises.css";
      import {Carousel} from 'react-materialize';

class VettedEnterpisesList extends Component {
  constructor(props) {
    super(props);
    this.state = { show: 3, limit: 3 };
    this.onHandleClick = this.onHandleClick.bind(this);
  }

  renderEnterprises(evaluations) {

    const enterprisesItems = _.map(evaluations, evaluation => {

      console.log(this.props.enterprises, "EN ENTER VETTED")

      const enterprise = this.props.enterprises[evaluation.enterprise_id];
      const officialEvaluation = this.props.officialEvaluations[
        evaluation.enterprise_id
      ];
      return (
        <VettedEnterpriseItem
          key={enterprise.id}
          enterprise={enterprise}
          officialEvaluation={officialEvaluation}
        />
      );
    });
    return enterprisesItems;
  }

  onHandleClick(event) {
    const show = this.state.show + this.state.limit;
    this.setState({ show });
  }

  renderMessage() {
      return <h3 className="center">You have not vetted any enterprises yet...</h3>
  }

  render() {

    let hide = "";
    if (
      _.isEmpty(this.props.userEvaluations) ||
      _.isEmpty(this.props.enterprises)
    )
    return this.renderMessage();
    if (this.props.userEvaluations.length == 0) {
      hide = "hide";
    }
    if (Object.keys(this.props.userEvaluations).length <= this.state.show) {
      hide = "hide";
    }

    const vetted = _.slice(
      _.values(this.props.userEvaluations),
      0,
      this.state.show
    );

    return (
      <div className="text-flow center">
        <div className="row margin-zero">
          {this.renderEnterprises(vetted)}
        </div>
        <div
          className={`row margin-zero load-more ${hide}`}
          id="load-more-header"
        >
          <div className="col s12">
            <div className="load-more">
              <button
                className="btn btn-flat btn-large "
                onClick={this.onHandleClick}
              >
                Load More
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VettedEnterpisesList;
