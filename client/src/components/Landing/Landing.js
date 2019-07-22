import React, { Component } from "react";
import Carousel from "../Carousel";
import SignUpModal from "../SignUpModal";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Landing.css";
import SubHeader from "./SubHeader";
import missingMiddle from "../missing-middle.svg";
import financial from "../financial-maturity.svg";
import world from "../../assets/images/landing/world.svg";
import howWorks from "../HowWorks.svg";
import arrow from "../Arrow.svg";

class Landing extends Component {
  constructor(props) {
    super(props);

    this.getStartedSectionData = [
      {
        title: 'Let’s Get Started',
        content: `We have developed a training site for CrowdVet. You will be required to create a separate login. Then come back to CrowdVet and sign up with us.`,
        buttonTitle: 'Go to Training Site',
        href: 'https://training.crowdvet.org',
      },
      {
        title: 'Get Certified',
        content: `Here's a document with certification details.`,
        buttonTitle: 'Learn More',
        href: 'https://google.com',
        halfWidth: true,
      },
      {
        title: 'Become a Partner',
        content: `Partner with crowdvet. Click to learn more.`,
        buttonTitle: 'Learn More',
        to: '/partnerships',
        halfWidth: true,
      },
      {
        title: 'Ready to Get Started?',
        content: `Once you've completed your training, click below to get started now!`,
        getStartedButton: true,
      },
    ];
  }

  static renderVideo() {
    return (
      <div className="green-section">
        <div className="container">
          <div className="row video-text-row">
            <div className="col s12">
              <div className="video-text">
                <h3 className="center-align heavy-title video-title">
                  Kiva + You
                </h3>
                <p className="flow-text video-subtitle">
                  Crowdvet.org aims to harness the knowledge of the crowd
                  to determine which social enterprises to fund.
                </p>
              </div>
            </div>
            <div className="col s12">
            </div>
          </div>
        </div>
        <div className="video-container">
          <iframe
            src="https://player.vimeo.com/video/210506986?embedparameter=value"
            width="440"
            height="248"
            frameBorder="0"
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  static renderIntroText() {
    return (
      <div className="container landing-container landing-container-intro">
        <div className="row">
          <div className="col s12">
            <h3 className="title-block-green">
              Kiva.org is a crowdfunding platform
              that provides loans to individuals that have limited access to financing
            </h3>
            <div className="subtitle-block">
              Kiva’s Direct to Social Enterprise (DSE) Program
              provides loans to early stage social enterprises that require working capital to grow.
            </div>
          </div>
        </div>
      </div>
    );
  }

  static renderAboutDse() {
    return (
      <div className="container landing-container" id="about-dse">
        <div className="row">
          <p className="col s12 title-block-green about-dse-above-image">
            Early-stage social enterprises are stuck in the "missing middle", too
            big for microfinance, yet too small for traditional banking.
          </p>
          <p className="center">
            <img src={missingMiddle} className="responsive-img" alt="missing middle"/>
          </p>
          <p className="col s12 center subtitle-block">
            The Direct-to-Social Enterprise program is a pilot program that aims
            to raise capital for early-stage social enterprises in a new and more
            efficient way.
          </p>
          <p className="center">
            <img src={financial} alt="financial"/>
          </p>
          <p className="col s12 center subtitle-block">
            CrowdVet.org, a pilot project under the DSE program, crowdsources the
            vetting of these loan applications so that Kiva can provide more
            early-stage social enterprises with access to 0% interest working
            capital loans.
          </p>
          <p className="col s12 title-block-green">
            Our borrowers are from all around the world
          </p>
          <p className="center">
            <img className="responsive-img" src={world} alt="DSE Program" />
          </p>
        </div>
      </div>
    );
  }

  static renderHowCrowdvetWorks() {
    return (
      <div id="how-crowdvet-works" className="gray-section">
        <div className="container">
          <div className="row">
            <div className="col s12 center how-works-title">
              We want your individual, unique view of the world!
            </div>
            <p className="col s12 center subtitle-block">
              A diverse crowd helps Kiva prioritize borrowers for internal due
              diligence processes. DSE loan applications are posted as they are
              received and will accept evaluations for up to 60 days.
            </p>
            <p className="center">
              <img src={howWorks} className="responsive-img" alt="A diagram showing how Kiva works"/>
            </p>
            <div className="col s12 center how-works-title set-schedule-title">
              Set your own Schedule
            </div>
            <div className="col s12 center title-block-green">Step 1</div>
            <div className="col s12 center subtitle-block">Join at any time</div>
            <p className="center">
              <img src={arrow} className="how-works-arrow" alt="an arrow pointing downward"/>
            </p>
            <div className="col s12 center title-block-green">Step 2</div>
            <div className="col s12 center subtitle-block">
              Vet any number of enterprises at your own pace
            </div>
            <p className="center">
              <img src={arrow} className="how-works-arrow" alt="an arrow pointing downward"/>
            </p>
            <div className="col s12 center title-block-green">Step 3 </div>
            <div className="col s12 center subtitle-block">
              Receive feedback and scores
            </div>
          </div>
          <div className="row">
            <div className="col s12 center title-block-green how-works-result-title">Result:</div>
            <div className="col s12 center subtitle-block">
              Based on your input, Kiva will reject or approve the loan
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderButton(section) {
    if (section.getStartedButton) {
      return this.renderGetStartedButton();
    }

    return section.href
      ? Landing.renderGetStartedHref(section)
      : Landing.renderGetStartedTo(section);
  }

  static renderGetStartedHref({href, buttonTitle}) {
    return (
      <a
        className="btn btn-lg btn-cta landing-get-started-button"
        href={href}
        target="_blank"
      >
        { buttonTitle }
      </a>
    );
  }

  static renderGetStartedTo({to, buttonTitle}) {
    return (
      <Link
        className="btn btn-lg btn-cta landing-get-started-button"
        to={to}
      >
        { buttonTitle }
      </Link>
    );
  }

  renderGetStartedSection(section) {
    const { title, content, halfWidth } = section;

    const className = `col s12${halfWidth ? ' m6' : ''} get-started-subsection`;

    return (
      <div className={className}>
        <div className="get-started-title">{ title }</div>
        <div className="get-started-content">{ content }</div>
        {this.renderButton(section)}
      </div>
    );
  }

  renderGetStarted() {
    return (
      <div className="container get-started-container" id="get-started">
        <div className="row">
          { this.getStartedSectionData.map(section => this.renderGetStartedSection(section)) }
        </div>
      </div>
    );
  }

  static renderTestimonials() {
    return (
      <div>
        <div className="green-section testimonials-section-title">
          <div className="container heavy-title">Testimonials</div>
        </div>
        <div className="container testimonials-container">
          <div className="row">
            <div className="col s12 m10 offset-m1">
              <div className="flow-text">
                <div className="center-align testimonial">
                  “Crowdvetting is a great opportunity to learn due diligence skills
                  and put your business education into practice to benefit social
                  enterprises. It’s also an exciting way to engage with Kiva’s work
                  and play a role in the social entrepreneurship ecosystem. I would
                  recommend this opportunity for anyone who’s interested in gaining
                  real-world experience in the impact field!”
                </div>

                <div className="center-align testimonial-name">
                  Miriam F., Graduate Student @ The Fletcher School, Tufts University
                </div>
              </div>
            </div>
          </div>
          <div className="row contact-label">
            <div className="col s12 center grey-text">
              Crowdvetting is a project of Kiva's Department of Strategic Initiatives
            </div>
            <div
              id="contact-us"
              className="col s12 center grey-text"
            >
              Contact us at crowdvet@kiva.org
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderGetStartedButton() {
    return this.props.auth
      ? (
        <Link className="btn-flat start-vetting-btn landing-get-started-button" to={"/user"}>
          Start Vetting
        </Link>
      )
      : (
        <Link className="btn-flat start-vetting-btn modal-trigger landing-get-started-button" to={"#modal1"}>
          Start Vetting
        </Link>
      );
  }

  render() {
    return (
      <div>
        <SubHeader />
        <Carousel />
        {Landing.renderIntroText()}
        {Landing.renderVideo()}
        {Landing.renderAboutDse()}
        {Landing.renderHowCrowdvetWorks()}
        {this.renderGetStarted()}
        {Landing.renderTestimonials()}
        <SignUpModal />
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Landing);
