import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../actions";
import _ from "lodash";
import VettedEnterpriseItem from "./VettedEnterpriseItem";
import "./Enterprises.css";

class VettedEnterpisesList extends Component {
  constructor(props) {
    super(props);
    this.state = { show: 3, limit: 3 };
    this.onHandleClick = this.onHandleClick.bind(this);
  }

  renderEnterprises(evaluations) {
    console.log(evaluations, "EVAL")
    console.log(this.props.enterprises, "ENTER")
    const enterprisesItems = _.map(evaluations, evaluation => {
      const enterprise = this.props.enterprises[evaluation.enterprise_id]
      const officialEvaluation = this.props.officialEvaluations[evaluation.enterprise_id]
      console.log(enterprise,"enterpise")
      return (
        <VettedEnterpriseItem key={enterprise.id} enterprise={enterprise} officialEvaluation={officialEvaluation}/>
      );
    });
    return enterprisesItems;
  }

  onHandleClick(event) {
    const show = this.state.show + this.state.limit;
    this.setState({ show });
  }

  render() {
    let hide = ''
    if (_.isEmpty(this.props.userEvaluations) || _.isEmpty(this.props.enterprises)) return null
    if(this.props.userEvaluations.length == 0) { hide = "hide" }

    const vetted = _.slice(_.values(this.props.userEvaluations),0, this.state.show);
    console.log(this.props.userEvaluations, "ESTO EH")
    console.log(vetted, "CORTADO")
    return (
      <div className="text-flow center">
        <div className="row margin-zero">{this.renderEnterprises(vetted)}</div>
        <div className={`row margin-zero load-more ${hide}`} id="load-more-header">
          <div className="col s12">
            <div className='load-more'>
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
