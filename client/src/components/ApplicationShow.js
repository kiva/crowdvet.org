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
import Excel from "./Excel.svg";
import Countdown from "react-countdown-now";
import CommentForm from "./Comment";
import CommentList from "./CommentList";
import utils from "./utils";
import _ from "lodash";
import moment from "moment";

class ApplicationShow extends Component {
  constructor(props) {
    super(props);
    const id = this.props.match.params.id;
    this.state = {
      topMenu: {
        profile: { active: true },
        vet: { active: false },
        faqs: { active: false }
      }
    };

    this.menu = {
      review: { text: "Review", url: `/application/${id}`, active: true },
      evaluation: {
        text: "Evaluation",
        url: `/users/evaluations/${id}`,
        active: false
      },
      results: { text: "Results", url: `/users/evaluations/results/${id}`, active: false }
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.fetchEnterprise(this.props.match.params.id);
    this.props.fetchUserEvaluation(this.props.match.params.id);
    this.props.fetchOfficialEvaluations();
    this.props.fetchEnterpriseComments(this.props.match.params.id);
  }

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
            mainText={`$${this.props.enterprise.loan.toLocaleString()}`}
            description="USD"
          />
          <Card name="COUNTRY" mainText={this.props.enterprise.Country.name} />
        </div>
      </div>
    );
  }
  renderTable() {
    return (
      <div>
        <table >
          <thead>
            <tr>
              <th colSpan="3" className="table-name center">
                View Application Materials
              </th>
            </tr>
          </thead>
          <tbody className="left-align">
            <tr>
              <td>
                <img src={PDF} />
                <a href={this.props.enterprise.loanInquiry}>
                  {this.props.enterprise.loanInquiry
                    ? "Initial Loan Inquiry"
                    : "Initial Loan Inquiry: N/A"}
                </a>
              </td>
              <td>
                <img src={PDF} />
                <a href={this.props.enterprise.loanApplication}>
                  {this.props.enterprise.loanApplication
                    ? "Loan Application"
                    : "Loan Application: N/A"}
                </a>
              </td>
              <td>
                <img src={PDF} />
                <a href={this.props.enterprise.boardAndManagement}>
                  {this.props.enterprise.boardAndManagement
                    ? "Board and Management Team"
                    : "Board and Management Team: N/A"}
                </a>
              </td>
            </tr>
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
              <th colSpan="4" className="table-name">
                View Financial Materials
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img src={Excel} />
                <a href={this.props.enterprise.zeroTool}>
                  {this.props.enterprise.zeroTool
                    ? " Zero Tool"
                    : " Zero Tool: N/A"}
                </a>
              </td>
              <td>
                <img src={PDF} />
                <a href={this.props.enterprise.historicalFinancial}>
                  {this.props.enterprise.historicalFinancial
                    ? "Historical Financial Statements"
                    : "Historical Financial Statements: N/A"}
                </a>
              </td>
              <td>
                <img src={PDF} />
                <a href={this.props.enterprise.YDTFinancial}>
                  {this.props.enterprise.YDTFinancial
                    ? "YTD Financial Statements"
                    : "YTD Financial Statements: N/A"}
                </a>
              </td>
              <td>
                <img src={PDF} />
                <a href={this.props.enterprise.latestFinancial}>
                  {this.props.enterprise.latestFinancial
                    ? "Latest Financial Statements"
                    : "Latest Financial Statements: N/A"}
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
        <div className="row left-align">
          <div className="col s12 m6 l6">
            <h5>Problem</h5>
            <p className="flow-text card-text left-align">
              {this.props.enterprise.description}
            </p>
          </div>
          <div className="col s12 m5 offset-m1 left-align">
            <h5>Loan Purpose</h5>
            <p className="flow-text card-text left-align">
              {this.props.enterprise.loanPurpose}
            </p>
          </div>
        </div>
        <div className="row left-align">
          <div className="col s12 m6 l6">
            <h5>Business Model</h5>
            <p className="flow-text card-text left-align">
              {this.props.enterprise.business}
            </p>
          </div>

          <div className="col s12 m5 offset-m1">
            <h5>Selected Metrics</h5>
            <div className="col s12  left-align">
              <p className="flow-text card-text left-align">
                <ul id="selected-metrics">
                  <li>
                    Began operating starting:{" "}
                    {this.props.enterprise.beganOperating}
                  </li>
                  <li>
                    Number of paid employees:{" "}
                    {this.props.enterprise.paidEmployees}
                  </li>
                  <li>
                    Ownerhip status: {this.props.enterprise.ownershipStatus}
                  </li>
                  <li>Asset size: {this.props.enterprise.asset}</li>
                  <li>
                    Previous Year Sales Revenue:{" "}
                    {this.props.enterprise.salesRevenue}
                  </li>
                </ul>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderCountDown(enterprise, evaluation) {
    if (!utils.isOpen(enterprise) && !_.isEmpty(evaluation)) {
      return (
        <div>
          Vetted {moment(evaluation.created_at).format("MMMM DD, YYYY")}
        </div>
      );
    }

    return (
      <Countdown date={enterprise.endDate} renderer={utils.timeRenderer} />
    );
  }

  render() {
    const {
      enterprise,
      officialEvaluation,
      evaluation,
      comments,
      auth
    } = this.props;

    if (!enterprise) return null;
    this.sector = enterprise.Sector.name;
    const imgName =
      (enterprise.Sector.image && `/sectors/${enterprise.Sector.image}`) ||
      enterprise.Sector.link;
    const toPage = utils.getPage(enterprise, officialEvaluation);
    const showResults = utils.showResults(enterprise, officialEvaluation);

    this.menu.evaluation.url = toPage;

    return (
      <div>
        <TopMenu menu={this.state.topMenu} />
        <div className="image-margin">
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
          <SubMenu menu={this.menu} />
        </div>
        <div className="container">
          {this.renderCards()}
          {this.renderContent()}
          {this.renderTable()}
          <div className="row" />
          <div className="row">
            <div className="col s12 center">
              <h4>Discussion</h4>
            </div>
          </div>
          <div className="row">
            <CommentList
              user={auth}
              enterprise_id={enterprise.id}
              comments={comments}
            />
          </div>
          <div className="row">
            <CommentForm enterprise_id={enterprise.id} />
          </div>
          <div className="center-align">
            <Link className="btn" to={toPage} id="evaluate">
              Continue to Evaluation
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(
  { auth, enterprises, evaluations, officialEvaluations, comments },
  ownProps
) {
  return {
    auth,
    enterprise: enterprises[ownProps.match.params.id],
    evaluation: evaluations[ownProps.match.params.id],
    officialEvaluation: officialEvaluations[ownProps.match.params.id],
    comments: _.pick(
      comments,
      _.map(_.get(enterprises[ownProps.match.params.id], "Comments"), "id")
    )
  };
}

export default connect(mapStateToProps, actions)(ApplicationShow);
