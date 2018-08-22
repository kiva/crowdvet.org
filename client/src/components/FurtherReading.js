import React, { Component } from "react";
import Carousel from "./Carousel-mz";
import carousel from "./caroussel-1.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import idgen from "./idgen";
import "./learnAbout.css";
import SignUpModal from "./SignUpModal";
import SubMenu from "./SubMenuLearn";

class FurtherReading extends Component {
  render() {
    const header = (
      <div className="white-text flow-text center-element learn-about">
        How can you help social enterprises make the world a better place, even
        if you can’t make a loan?
      </div>
    );
    return (
      <div>
        <SubMenu />
        <Carousel
          images={[carousel, carousel]}
          options={{ fullWidth: true, indicators: true }}
          carouselId={idgen()}
          fixedText={header}
        />
        <SignUpModal />
        <div className="container">{this.renderContent()}</div>
      </div>
    );
  }

  renderContent() {
    return (
      <div className="row">
        <h3 className="col s12 center bold">Staff Recomendations</h3>
          {this.renderRecomendation()}
          {this.renderRecomendation()}
          {this.renderRecomendation()}
          {this.renderRecomendation()}
      </div>
    );
  }

  renderRecomendation() {
    return (
      <div className="row">
        <div className="col s10 offset-s1 grey-background center">
          <p style={{fontSize:"20px"}}><span className="bold" >“The Questions That Matter,”</span> Tim Hanson</p>
          <p className="green-text " style={{fontSize:"18px"}}> A primer on how to ask good questions</p>
        </div>
      </div>
    )
  }
}

export default FurtherReading;
