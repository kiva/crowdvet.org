import React, { Component } from "react";
import Carousel from "./Carousel";
import SignUpModal from "./SignUpModal";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Landing.css";
import world from "./world.svg";
import HowWorks from "./HowItWorks";

class Landing extends Component {
  renderText() {
    return (
      <div className="text row flow-text">
        <p className="col s12" id="kiva-message">
          Here at Kiva, we're constantly asking
        </p>
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
        <div className="center-align ">Testimonials</div>
      </div>
    );
  }

  renderPrefooter() {
    return (
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="flow-text" id="prefooter">
            <div className="center-align" id="prefooter">
              “Crowdvetting is a great opportunity to learn due diligence skills
              and put your business education into practice to benefit social
              enterprises. It’s also an exciting way to engage with Kiva’s work
              and play a role in the social entrepreneurship ecosystem. I would
              recommend this opportunity for anyone who’s interested in gaining
              real-world experience in the impact field!”
            </div>

            <div id="after-text" className="center-align">
              Miriam F., Graduate Student @ The Fletcher School, Tufts University
            </div>
          </div>
        </div>
      </div>
    );
  }


  renderVideo() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m6">
            <div style={{ marginTop: "40px" }}>
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
                Crowdvet.org aims to harness the knowledge of the crowd to give
                social enterprises the capital they need to scale.
              </p>
              <Link to={"/learn"} className="btn">
                Learn About CrowdVetting
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  renderContact(){
    return(
      <div className="row" style={{marginTop:"50px"}}>
      <p className="col s12 m4 offset-m4 center grey-text">
      Crowdvetting is a project of Kiva's Department of Strategic Initiatives
      </p>
      <p id="contact-us" className="col s12 m4 offset-m4 center grey-text">
        Contact us at crowdvet@kiva.org</p>
      </div>
    )
  }
  render() {
    return (
      <div>
        <Carousel />
        <SignUpModal />
        {this.renderVideo()}
        {this.renderText()}
        <div className="container">
          <HowWorks auth={this.props.auth}  learn={{ text:"FAQs", url: "/faqs" }}/>
        </div>
        {this.renderWorld()}
        {this.renderRecent()}
        {this.renderPrefooter()}
        {this.renderContact()}
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Landing);
