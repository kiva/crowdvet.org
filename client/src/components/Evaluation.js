import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Field, reduxForm, initialize } from "redux-form";
import * as actions from "../actions";
import SubMenu from "./SubMenu";
import TopMenu from "./TopMenu";
import QuestionList from "./QuestionList";
import _ from "lodash";
import "./Evaluation.css";
import EvaluationForm from './EvaluationForm';
import Countdown from "react-countdown-now";

class ApplicationEvaluate extends Component {
  constructor(props) {
    super();
    this.state = {
      menu: { 1: "Review", 2: "Evaluation", 3: "Results" },
      active: 1
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.fetchEnterprise(this.props.match.params.id);
    this.props.fetchUserEvaluation(this.props.match.params.id);
    this.props.fetchQuestions();
  }

  onSubMenuChange = (menu, active) => {
    this.setState({ menu, active });
  };

  render() {
    const { auth, questions, enterprise } = this.props;
    // redirect user if not logged
    if (!auth) return null;
    if (!enterprise) return null;

    this.sector = enterprise.Sector ? enterprise.Sector.name : "Water";
    const imgName = `/sectors/${this.sector}.jpg`;

    return (
      <div>
        <TopMenu onSubMenuChange={this.onSubMenuChange} />
        <div style={{ marginBottom: "-25px" }}>
          <div className="row">
            <div className="col s12 center img-header">
              <h2 id="title-img" className=" center">{enterprise.name}
                <h3><Countdown date={enterprise.endDate} /></h3>
              </h2>
            </div>
          <img className="responsive-img img-pic"src={imgName} width="100%" alt="" />
          </div>
        </div>
        <div className="row flow-text dashboard">
          <SubMenu menu={this.state.menu} />
        </div>
        <div className="container">
          <div className="row flow-text center">
            <h3 className="col s12">Loan Evaluation</h3>
          </div>
          <div className="row">
            <EvaluationForm enterprise_id={this.props.match.params.id} history={this.props.history}/>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth, enterprises, questions }, ownProps) {
  return {
    auth,
    enterprise: enterprises[ownProps.match.params.id],
  };
}
export default connect(mapStateToProps, actions)(ApplicationEvaluate);
