import React from "react";
import arrow from "./Arrow.svg";
import howWorks from "./HowWorks.svg";
import { Link } from "react-router-dom";

const HowItWorks = props => {
  const startVetting = props.auth ? <Link className="btn-flat start-vetting-btn"
    to={"/user"}>Start Vetting</Link> : <Link className="btn-flat start-vetting-btn modal-trigger" to={"#modal1"}>Start Vetting</Link>
  return (
    <div>
      <div className="row">
        <div className="row" />
        <div className="col s12 center font-34 bold">
          We want your individual, unique view of the world!
        </div>
        <p className="col s12 center font-26">
          A diverse crowd helps Kiva prioritize borrowers for internal due
          diligence processes. DSE loan applications are posted as they are
          received and will accept evaluations for up to 60 days.
        </p>
        <p className="center">
          <img src={howWorks} />
        </p>
        <div className="col s12 center font-34 bold">
          Set your own Schedule
        </div>
        <div className="col s12 center font-26 green-text">Step 1</div>
        <div className="col s12 center font-26">Join at any time</div>
        <p className="center">
          <img src={arrow} />
        </p>
        <div className="col s12 center font-26 green-text">Step 2</div>
        <div className="col s12 center font-26">
          Vet any number of enterprises at your own pace
        </div>
        <p className="center">
          <img src={arrow} />
        </p>
        <div className="col s12 center font-26 green-text">Step 3 </div>
        <div className="col s12 center font-26">
          Receive feedback, scores, and badges
        </div>
      </div>
      <div className="row">
        <div className="col s12 center font-26 green-text">Result:</div>
        <div className="col s12 center font-26">
          Based on your input, Kiva will reject or approve the loan
        </div>
      </div>
      <div className="row" style={{ marginTop: "50px" }}>
        <p className="col s6 center">{startVetting}</p>
        <p className="col s6 center">
          <Link className="btn-flat learn-more-btn" to={"/further-reading"}>
            Learn More
          </Link>
        </p>
      </div>
    </div>
  );
};

export default HowItWorks;
