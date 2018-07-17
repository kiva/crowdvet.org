import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../actions";
import "./Profile.css";
import "./ApplicationShow.css";
import SubMenu from "./SubMenu";
import TopMenu from "./TopMenu";
import Card from "./Card";
import PDF from "./PDF.svg";
import Countdown from "react-countdown-now";
import utils from "./utils";
import _ from "lodash";
import moment from "moment";

class ApplicationShow extends Component {
  constructor(props) {
    super();
    this.state = {
      menu: { 1: "Review", 2: "Evaluation", 3: "Results" },
      active: 1
    };
    let sector = "";
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.fetchEnterprise(this.props.match.params.id);
    this.props.fetchUserEvaluation(this.props.match.params.id);
    this.props.fetchOfficialEvaluations();
  }

  onSubMenuChange = (menu, active) => {
    this.setState({ menu, active });
  };

  renderCards() {
    return (
      <div>
        <div className="row flow-text center">
          <h3 className="col s12">Loan Summary Report</h3>
        </div>
        <div className="row flow-text content center">
          <Card name="COMPANY SECTOR" mainText={this.sector} />
          <Card
            name="AMOUNT REQUESTED"
            mainText={`$${this.props.enterprise.loan}`}
            description="USD"
          />
          <Card
            name="GEOGRAPHICAL LOCATION"
            mainText="Kenya"
            description="WEST AFRICA"
          />
        </div>
      </div>
    );
  }
  renderTable() {
    return (
      <div>
        <table className="centered">
          <thead>
            <tr>
              <th colSpan="3" className="table-name">
                View Application Materials
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img src={PDF} />
                <a href={this.props.enterprise.certificateIncorporation}>
                  Certificate of Incorporation
                </a>
              </td>
              <td>
                <img src={PDF} />
                <a href={this.props.enterprise.businessPlan}>
                  {this.props.enterprise.businessPlan
                    ? "Business Plan"
                    : "Business Plan: N/A"}
                </a>
              </td>
              <td>
                <img src={PDF} />
                <a href={this.props.enterprise.impactStudy}>
                  {this.props.enterprise.impactStudy
                    ? "Impact Study"
                    : "Impact Study: N/A"}
                </a>
              </td>
            </tr>
            <tr>
              <td>
                <img src={PDF} />
                <a href={this.props.enterprise.managementTeam}>
                  {this.props.enterprise.managementTeam
                    ? "Management Team Profile"
                    : "Management Team Profile: N/A"}
                </a>
              </td>
              <td>
                <img src={PDF} />
                <a href={this.props.enterprise.boardOfDirectors}>
                  {this.props.enterprise.boardOfDirectors
                    ? "Board of Directors"
                    : "Boad of Directors: N/A"}
                </a>
              </td>
              <td>
                <img src={PDF} />
                <a href={this.props.enterprise.anualReport}>
                  {this.props.enterprise.anualReport
                    ? "Annual Report"
                    : "Annual Report: N/A"}
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <table className="centered">
          <thead>
            <tr>
              <th colSpan="3" className="table-name">
                View Financial Materials
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <a href={this.props.enterprise.historicalFinancial}>
                  {this.props.enterprise.historicalFinancial
                    ? "Historical Financial Statements"
                    : "Historical Financial Statements: N/A"}
                </a>
              </td>
              <td>
                <a href={this.props.enterprise.YDTFinancial}>
                  {this.props.enterprise.YDTFinancial
                    ? "YTD Financial Statements"
                    : "YTD Financial Statements: N/A"}
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  renderContent() {
    return (
      <div>
        <div className="row center">
          <div className="col s12 m6 l6">
            <h5>Problem</h5>
            <div className="flow-text card-text">
              {this.props.enterprise.description}
            </div>
          </div>
          <div className="col s12 m6 l6">
            <h5>Loan Purpose</h5>
            <div className="flow-text card-text">
              {this.props.enterprise.loanPurpose}
            </div>
          </div>
        </div>
        <div className="row center">
          <div className="col s12 m6 l6">
            <h5>Business Model</h5>
            <div className="flow-text card-text">
              {this.props.enterprise.business}
            </div>
          </div>

          <div className="col s12 m6 l6">
            <h5>Selected Metrics</h5>
          </div>
          <div className="col s4 push-s2 left-align">
            <div className="flow-text card-text">
              <ul id="selected-metrics">
                <li>
                  Began operating starting:
                  {this.props.enterprise.beganOperating}
                </li>
                <li>
                  Number of paid employees:
                  {this.props.enterprise.paidEmployees}
                </li>
                <li>
                  Ownerhip status: {this.props.enterprise.ownershipStatus}
                </li>
                <li>Asset size: {this.props.enterprise.asset}</li>
                <li>
                  Previous Year Sales Revenue:
                  {this.props.enterprise.salesReveneu}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }


  renderCountDown(enterprise, evaluation) {
    if (!utils.isOpen(enterprise) && !_.isEmpty(evaluation)) {
      return (
        <div>Vetted {moment(evaluation.created_at).format("MM-DD-YYYY")}</div>
      );
    }

    return <Countdown date={enterprise.endDate} renderer={utils.timeRenderer} />;
  }

  render() {
    const { enterprise, officialEvaluation, evaluation } = this.props;
    if (!enterprise) return null;
    this.sector = enterprise.Sector ? enterprise.Sector.name : "Water";
    const imgName = `/sectors/${this.sector}.jpg`;
    console.log(evaluation, "coon eval");
    const toPage = utils.getPage(enterprise, officialEvaluation);
    return (
      <div>
        <TopMenu onSubMenuChange={this.onSubMenuChange} />
        <div style={{ marginBottom: "-25px" }}>
          <div className="row">
            <div className="col s12 center img-header">
              <h2 id="title-img" className=" center">
                {enterprise.name}
                <h3>{this.renderCountDown(enterprise, evaluation)}</h3>
              </h2>
            </div>
            <img
              className="responsive-img img-pic"
              src={imgName}
              width="100%"
              alt=""
            />
          </div>
        </div>
        <div className="row flow-text dashboard">
          <SubMenu menu={this.state.menu} />
        </div>
        <div className="container">
          {this.renderCards()}
          {this.renderContent()}
          {this.renderTable()}

          <div>
            <div className="center-align">
              <Link className="btn" to={toPage} id="evaluate">
                Continue to Evaluation
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(
  { auth, enterprises, evaluations, officialEvaluations },
  ownProps
) {
  return {
    auth,
    enterprise: enterprises[ownProps.match.params.id],
    evaluation: evaluations[ownProps.match.params.id],
    officialEvaluation: officialEvaluations[ownProps.match.params.id]
  };
}

export default connect(mapStateToProps, actions)(ApplicationShow);
