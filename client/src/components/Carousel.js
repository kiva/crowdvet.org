import React, { Component } from "react";
import carousel from "./caroussel-1.png";
import carousel2 from "./Education.jpg"
import carousel3 from "./Agriculture.jpg"
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./Carousel.css";

class Carousel extends Component {
  componentDidMount() {
    const $ = window.jQuery;
    $(document).ready(function() {
      // start carrousel
      $(".carousel.carousel-slider").carousel({
        fullWidth: true,
        indicators: false
      });

      // move next carousel
      $(".moveNextCarousel").click(function(e) {
        e.preventDefault();
        e.stopPropagation();
        $(".carousel").carousel("next");
      });

      // move prev carousel
      $(".movePrevCarousel").click(function(e) {
        e.preventDefault();
        e.stopPropagation();
        $(".carousel").carousel("prev");
      });
    });
  }

  renderText() {
    const joinToday = (this.props.auth && (
      <Link className="btn modal-trigger" to={"/vet/enterprises"}>
        Start Vetting
      </Link>
    )) || (
      <Link className="btn modal-trigger" to={"#modal1"}>
        Join Today
      </Link>
    );
    return (
      <div className="carousel-text row">
        <div className="col l8 offset-l2 hide-on-med-and-down">
          <div>Help us enable dreams</div>
          <div>around the world</div>
          {joinToday}
        </div>
      </div>
    );
  }
  render() {
    return (
      <div>
        <div className="carousel carousel-slider" data-indicators="true">
          <div className="carousel-fixed-item middle-indicator" style={{height:"50px"}}>
            <div className="left">
              <a
                href="prev"
                className="movePrevCarousel middle-indicator-text content-indicator"
              >
                <i className="material-icons  middle-indicator-text">
                  chevron_left
                </i>
              </a>
            </div>

            <div className="right">
              <a
                href="next"
                className=" moveNextCarousel middle-indicator-text content-indicator"
              >
                <i className="material-icons right middle-indicator-text">
                  chevron_right
                </i>
              </a>
            </div>
          </div>
          <a className="carousel-item" href="#one!">
            <div className="carousel-fixed-item">{this.renderText()}</div>
            <img src={carousel} alt="" />
          </a>
          <a className="carousel-item" href="#two!">
            <img src={carousel2} alt="" />
          </a>
          <a className="carousel-item" href="#three!">
            <img src={carousel3} alt="" />
          </a>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Carousel);
