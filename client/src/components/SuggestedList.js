import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";
import Countdown from "react-countdown-now";
import Carousel from "./Carousel-mz";


class SuggestedList extends Component {
  renderImages(images, enterprise) {
    const content = _.map(images, image => image.url);
    return (
      <Carousel
        className="inprogress-evaluation"
        carouselId={enterprise.id}
        options={{ fullWidth: true, indicators: true }}
        images={content}
      />
    );
  }

  renderEnterprises(enterprises) {
    const enterprisesItems = _.map(enterprises, enterprise => {
      return this.renderInEnterpriseItem(enterprise);
    });
    return enterprisesItems;
  }

  onHandleDelete(evaluation) {
    this.props.removeUserEvaluation(evaluation);
  }

  renderInEnterpriseItem(enterprise, evaluation) {
    return (
      <div key={enterprise.id}>
        <div className="col s12 m3">
          <div className="card" id="card-suggested">
            <div className="card-image">
              {!_.isEmpty(enterprise.Images) ? (
                this.renderImages(enterprise.Images, enterprise)
              ) : (
                <img style={{ height: "230px" }} src={enterprise.image1} />
              )}
            </div>
            <div className="card-content">
              <p>{enterprise.name}</p>
            </div>
            <div className="card-action warning-status">
              <div id="card-link">
                <Countdown date={enterprise.endDate} /> left
              </div>
            </div>
            <div className="card-review-btn">
              <Link
                className="white-text btn-flat no-text-transform"
                to={`/application/${enterprise.id}`}
              >
                Review Application
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  renderText() {
    return (
      <div className="row center">
        <div className="col s10 offset-s1">
          <h5>
            Please select sectors you are interested in under “Personal
            Settings” on your profile page to receive enterprise suggestions.
          </h5>
        </div>
      </div>
    );
  }

  render() {
    const { enterprises } = this.props;
    if (_.isEmpty(enterprises)) {
      return this.renderText();
    }
    return (
      <div className="">
        <div className="row center">{this.renderEnterprises(enterprises)}</div>
      </div>
    );
  }
}

export default connect(null, null)(SuggestedList);
