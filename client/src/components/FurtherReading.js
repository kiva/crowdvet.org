import React, { Component } from "react";
import Carousel from "./Carousel-mz";
import carousel from "./caroussel-1.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import idgen from "./idgen";
import "./learnAbout.css";
import SignUpModal from "./SignUpModal";
import SubMenu from "./SubMenuLearn";
import * as actions from "../actions";
import _ from 'lodash';

class FurtherReading extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.fetchRecomendations();
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
        <SubMenu menu={{
          about: { active: false },
          howWorks: { active: false },
          further: { active: true }
        }} />
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
          {this.renderRecomendations()}
      </div>
    );
  }

  renderRecomendations() {
    const content = _.map(this.props.recomendations, recomendation => {
      return (
        <div className="row">
          <div className="col s10 offset-s1 grey-background center">
            <p style={{fontSize:"20px"}}><a className="black-text" href={recomendation.link}> <span className="bold" >{recomendation.title}</span></a>, {recomendation.author}</p>
            <p className="green-text " style={{fontSize:"18px"}}>{recomendation.description}</p>
          </div>
        </div>
      )
    })
    return content
  }
}

function mapStateToProps({ recomendations }) {
  return { recomendations };
}

export default connect(mapStateToProps, actions)(FurtherReading);
