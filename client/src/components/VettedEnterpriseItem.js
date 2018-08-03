import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Vetted.css";
import _ from "lodash";
import Carousel from "./Carousel-mz";
import idgen from './idgen';

class EnterpriseItem extends Component {

  renderImages(images) {
    const content = _.map(images, image => image.url)
    return <Carousel className="vetted" carouselId={`carousel${idgen()}`} options={{ fullWidth: true, indicators:true}} images={content} />;
  }

  render() {
    const { enterprise, officialEvaluation } = this.props;
    const investment = _.get(officialEvaluation, "status")
      ? officialEvaluation.status
      : "Pending";
    return (
      <div className="col s12 m4" id="card-wrapper">
        <div className="card" id="card-vetted">
          <div className="card-image">

              { !_.isEmpty(enterprise.Images) ?
                this.renderImages(enterprise.Images) : <img src={enterprise.image1} />
              }

             <div className="card-title flow-text">
              <p id="investment-card">investment {investment}:</p>
              <p id="card-vetted">{renderName(enterprise.name)}</p>
              <Link to={`/application/${enterprise.id}`} id="read-card">
                Read More >>
              </Link>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

const renderName = name => {
  return name.length > 15 ? `${name.substring(0, 15)}...` : name;
};
export default EnterpriseItem;
