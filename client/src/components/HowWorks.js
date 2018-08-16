import React, { Component } from "react";
import Carousel from "./Carousel-mz";
import carousel from './caroussel-1.png';
import { Link } from "react-router-dom";
import idgen from "./idgen";
import "./HowWorks.css";
import arrow from "./Arrow.svg";
import howWorks from "./HowWorks.svg";


class HowWorks extends Component {

  render() {
    const header = <div className="white-text flow-text center-element learn-about">How can you help social enterprises make the world
    a better place, even if you can’t make a loan?</div>
    return (
      <div>
      <Carousel images={[carousel, carousel]}
      options={{ fullWidth: true, indicators: true }} carouselId={idgen().toString()}
       fixedText={header}
      />
      <div className="container">
        {this.renderContent()}
      </div>
      </div>
    )
  }

  renderContent() {
    return (
      <div className="row">
        <div className="row" />
        <div className="col s12 center font-34 bold">We want your individual, unique view of the world!</div>
        <p className="col s12 center font-26">A diverse crowd helps Kiva prioritize borrowers for internal due diligence processes.
          DSE loan applications are posted as they are received and will accept evaluations for up to 60 days.</p>
        <p className="center"><img src={howWorks} /></p>
          <div className="col s12 center font-34 bold">Set your own Schedule</div>
          <div className="col s12 center font-26 green-text">Step 1</div>
          <div className="col s12 center font-26">Join at any time</div>
          <p className="center"><img src={arrow} /></p>
          <div className="col s12 center font-26 green-text">Step 2</div>
          <div className="col s12 center font-26">Vet any number of enterprises at your own pace</div>
          <p className="center"><img src={arrow} /></p>
          <div className="col s12 center font-26 green-text">Step 3 </div>
          <div className="col s12 center font-26">Receive feedback, scores, and badges</div>
          <p className="col s12 center">
            <Link className="btn-flat start-vetting-btn" to={""}>Start Vetting</Link>
          </p>
      </div>

    )
  }
}

export default HowWorks;
