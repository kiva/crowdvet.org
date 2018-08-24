import React, { Component } from "react";
import Carousel from "./Carousel";
import SignUpModal from "./SignUpModal";
import { Link } from "react-router-dom";
import "./Landing.css";
import world from "./world.svg";

class Landing extends Component {
  renderText() {
    return (
      <div className="text row flow-text">
        <p className="col s12" id="kiva-message">Here at Kiva, we're constantly asking</p>
        <div className="flow-text col s12">
          How can you help social enterprises make the world
        </div>
        <div className="flow-text col s12">
          a better place, even if you can't make a loan?
        </div>
      </div>
    );
  }
  renderWorld() {
    return (
      <div className="world">
        <div>Our borrowers are from all around the world</div>
        <img className="responsive-img" src={world} alt="" />
      </div>
    );
  }

  renderRecent() {
    return (
      <div className="recent flow-text">
        <div className="center-align ">Recent Loan Activity</div>
      </div>
    );
  }

  renderPrefooter() {
    return (
      <div className="flow-text" id="prefooter">
        <div className="center-align" id="prefooter">
          “Crowdvet.org gave me a chance to experience what its like to
        </div>
        <div className="center-align">
          work at a non-profit, and a sense of how I could help.”
        </div>
        <div id="after-text" className="center-align">
          Lauren S., Graduate Student @ Hult School of Business
        </div>
      </div>
    );
  }

  renderButton() {
    return (
      <div className="center-align">
        <a className="btn" id="evaluate">
          Evaluate a Sample Loan
        </a>
      </div>
    );
  }

  renderVideo() {
    return (
      <div className="container">
        <div className="row">
                <div className="col s12 m6">
                  <div style={{ marginTop: "40px"}}>
                    <iframe
                      src="https://player.vimeo.com/video/210506986?embedparameter=value"
                      width="440"
                      height="248"
                      frameBorder="0"
                      allowFullScreen
                    />
                  </div>
                  </div>
                  <div className="col s12 m6">
                    <div className="video-text">
                      <h3 className="center-align" id="title">
                        Kiva + You
                      </h3>
                      <p className="flow-text">
                        Crowdvet.org aims to harness the knowledge of the crowd to
                        give social enterprises the capital they need to scale.
                      </p>
                      <Link to={"/learn"} className="btn">Learn About CrowdVetting</Link>
                    </div>
                  </div>
          </div>
      </div>
    );
  }
  render() {
    return (
      <div>
        <Carousel />
        <SignUpModal />
        {this.renderVideo()}
        {this.renderText()}
        {this.renderWorld()}
        {this.renderRecent()}
        {this.renderPrefooter()}
        {this.renderButton()}
      </div>
    );
  }
}

export default Landing;
