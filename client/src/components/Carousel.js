import React, { Component } from 'react';
import carousel from './caroussel-1.png';

class Carousel extends Component {
  componentDidMount() {
    const $ = window.jQuery;
    $(document).ready(function(){
      $('.carousel').carousel({
          fullWidth: true,
          indicators: true
        });
    })
  }

  renderText() {
    return (
      <div className="carousel-text row">
        <div className="col s12 hide-on-med-and-down">
        <div>Help us enable dreams</div>
        <div>around the world</div>
        <div className="btn">Join Today</div>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div>
        <div className="carousel carousel-slider">
          <a className="carousel-item" href="#one!">
            <div className="carousel-fixed-item left">
              {this.renderText()}
            </div>
            <img src={carousel} alt="" />
          </a>
          <a className="carousel-item" href="#two!">
            <img src={carousel} alt="" />
          </a>
          <a className="carousel-item" href="#three!">
            <img src={carousel} alt="" />
          </a>
        </div>
      </div>
    );
  }
}

export default Carousel;
