import React, { Component } from "react";
import Carousel from "../Carousel-mz";
import carousel from "../caroussel-1.png";
import carousel2 from "../Education.jpg"
import carousel3 from "../Agriculture.jpg"
import Sheet from "../../assets/images/partnerships/sheet.jpg";
import Monitor from "../../assets/images/partnerships/monitor.jpg";
import MagnifyingGlass from "../../assets/images/partnerships/magnifying-glass.jpg";
import Calendar from "../../assets/images/partnerships/calendar.jpg";
import Target from "../../assets/images/partnerships/target.jpg";
import BerkeleyHaas from "../../assets/images/partnerships/berkeley-haas.jpg";
import BlackRock from "../../assets/images/partnerships/black-rock.jpg";
import UCLA from "../../assets/images/partnerships/ucla.jpg";
import ChicagoBooth from "../../assets/images/partnerships/chicago-booth.jpg";
import ESADE from "../../assets/images/partnerships/esade.jpg";
import UniversityOfChicago from "../../assets/images/partnerships/university-of-chicago.jpg";
import OneEightyDegrees from "../../assets/images/partnerships/180-degrees.jpg";
import UTSA from "../../assets/images/partnerships/utsa.jpg";
import NetImpact from "../../assets/images/partnerships/net-impact.jpg";
import UniversityOfMichigan from "../../assets/images/partnerships/university-of-michigan.jpg";
import ColumbiaBusinessSchool from "../../assets/images/partnerships/columbia-business-school.jpg";
import UniversityOfSouthCarolina from "../../assets/images/partnerships/university-of-south-carolina.jpg";
import { connect } from "react-redux";
import idgen from "../idgen";
import "./partnerships.css";
import SignUpModal from "../SignUpModal";
import SubMenu from "../SubMenuLearn";

class Partnerships extends Component {
  constructor(props) {
    super(props);
    this.processSteps = [
      {
        title: 'Review & Understand Crowdvetting',
        /*icon: 'description',*/
        image: Sheet,
        alt: 'Document icon',
      },
      {
        title: 'Teach Your Students or Group',
        image: Monitor,
        alt: 'Monitor icon',
      },
      {
        title: 'Get Your Questions Answered',
        image: MagnifyingGlass,
        alt: 'Magnifying glass icon',
      },
      {
        title: 'Enroll in a Certificate Program',
        image: Calendar,
        alt: 'Calendar icon',
      },
      {
        title: 'Become a Regular Vetter!',
        image: Target,
        alt: 'Target icon',
      },
    ];
    this.ourPartners = [
      [
        {
          image: BerkeleyHaas,
          alt: 'BerkeleyHaas',
        },
        {
          image: BlackRock,
          alt: 'BlackRock',
        },
        {
          image: UCLA,
          alt: 'UCLA',
        },
      ],
      [
        {
          image: ChicagoBooth,
          alt: 'The University of Chicago School of Business',
          isTall: true,
        },
        {
          image: ESADE,
          alt: 'ESADE',
        },
        {
          image: UniversityOfChicago,
          alt: 'The University of Chicago',
        },
      ],
      [
        {
          image: OneEightyDegrees,
          alt: '180 Degrees Consulting',
          isTall: true,
        },
        {
          image: UTSA,
          alt: 'UTSA',
        },
        {
          image: NetImpact,
          alt: 'NetImpact',
        },
      ],
      [
        {
          image: UniversityOfMichigan,
          alt: 'University Of Michigan',
        },
        {
          image: ColumbiaBusinessSchool,
          alt: 'Columbia Business School',
          isTall: true,
        },
        {
          image: UniversityOfSouthCarolina,
          alt: 'University Of South Carolina',
          isTall: true,
        },
      ],
    ];
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const header = (
      <div className="white-text flow-text center-element partnerships">
        How can you help social enterprises make the world a better place, even
        if you can’t make a loan?
      </div>
    );

    return (
      <div>
        <SubMenu
          menu={{
            about: { active: true },
            howWorks: { active: false },
            further: { active: false }
          }}
        />
        <Carousel
          images={[carousel, carousel2,carousel3]}
          options={{ fullWidth: true, indicators: true }}
          carouselId={idgen()}
          fixedText={header}
        />
        <SignUpModal />
        <div className="container">{this.renderContent()}</div>
      </div>
    );
  }

  renderContent() {//TODO: DELETE LINE 87

    return (
      <div className="row partnerships-content center">
        <div className="col s12">
          <h4 className="green-color">
            If you are a Professor, a Student group, or an event organizer, and would like to host a Crowdvet session in your class, meeting or event, you can partner with us
          </h4>
        </div>
        <div className="col s12">
          <p>
            Crowdvet provides our vetters with the opportunity to practice and develop their investing skills and
            gain real Impact Investing experience while helping Kiva speed up the Due Diligence process provide loans
            to our Direct to Social Enterprise program applicants faster.
          </p>
          <p>
            You can partner with us to run a Crowdvet session, or a long-term Certification program for your student
            group, class, or event attendees.
          </p>
        </div>
        <div className="col s12">
          <h4 className="green-color process-section-title">Partnership Process</h4>
          <div className="row">
            {(this.renderProcessSteps())}
          </div>
        </div>
        <div className="col s12 partnerships-ottom-section">
          <p className="process-cta-description">
            Click below for a more detailed walk through of our partnerships process and access to training materials
          </p>
          <a
            className="btn btn-lg btn-cta partnerships-get-started-button"
            href="https://docs.google.com/document/d/1rnLZYUkfZXZVKtXVm049FyPJZ5oFnLRktWPLr4Ka0yM/edit"
            target="_blank"
          >
            Get Started
          </a>
          <div className="col s12">
            <h4 className="green-color process-our-partners-title">Our Partners</h4>
            {this.renderOurPartners()}
          </div>
        </div>
      </div>
    );
  }

  renderProcessSteps() {
    return this.processSteps.map(({title, image, alt}, index) => (
      <div className={`process-step-wrapper col s12 m6 l2 offset-m3 ${index === 0 ? 'offset-l1' : ''}`}>
        <div className="process-step-image-container">
          <img className="process-step-image" src={image} alt={alt}/>
        </div>
        <div className="process-step-number">Step {index + 1}</div>
        <div className="process-step-title">{title}</div>
      </div>
    ));
  }

  renderOurPartners() {
    return this.ourPartners.map(row => (
      <div className="partnerships-our-partners-image-row">
        {
          row.map(({image, alt, isTall}) => (
            <div className={`partnerships-our-partners-image-container ${isTall ? 'partnerships-our-partners-image-container-tall': ''}`}>
              <img
                className="partnerships-our-partners-image"
                src={image}
                alt={alt}
              />
            </div>
          ))
        }
      </div>
    ))
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Partnerships);
