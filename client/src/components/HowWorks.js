import React, { Component } from "react";
import Carousel from "./Carousel-mz";
import carousel from "./caroussel-1.png";
import carousel2 from "./Education.jpg"
import carousel3 from "./Agriculture.jpg"
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import idgen from "./idgen";
import "./HowWorks.css";
import arrow from "./Arrow.svg";
import howWorks from "./HowWorks.svg";
import SignUpModal from "./SignUpModal";
import SubMenu from "./SubMenuLearn";

class HowWorks extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    const header = (
      <div className="white-text flow-text center-element learn-about">
        How can you help social enterprises make the world a better place, even
        if you can’t make a loan?
      </div>
    );
    return (
      <div>
        <SubMenu
          menu={{
            about: { active: false },
            howWorks: { active: true },
            further: { active: false }
          }}
        />
        <Carousel
          images={[carousel, carousel2,carousel3]}
          options={{ fullWidth: true, indicators: true }}
          carouselId={idgen().toString()}
          fixedText={header}
        />
        <SignUpModal />
        <div className="container">{this.renderContent()}</div>
      </div>
    );
  }

  renderContent() {
    const startVetting = this.props.auth ? (
      <Link className="btn-flat start-vetting-btn" to={"/user"}>
        Start Vetting
      </Link>
    ) : (
      <Link className="btn-flat start-vetting-btn modal-trigger" to={"#modal1"}>
        Start Vetting
      </Link>
    );
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
            <img src={howWorks} alt="how it works diagram"/>
          </p>
          <div className="col s12 center font-34 bold">
            Set your own Schedule
          </div>
          <div className="col s12 center font-26 green-text">Step 1</div>
          <div className="col s12 center font-26">Join at any time</div>
          <p className="center">
            <img src={arrow} alt="image of an arrow"/>
          </p>
          <div className="col s12 center font-26 green-text">Step 2</div>
          <div className="col s12 center font-26">
            Vet any number of enterprises at your own pace
          </div>
          <p className="center">
            <img src={arrow} alt="image of an arrow"/>
          </p>
          <div className="col s12 center font-26 green-text">Step 3 </div>
          <div className="col s12 center font-26">
            Receive feedback and scores
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
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(HowWorks);
