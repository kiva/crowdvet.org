import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import _ from "lodash";
import Carousel from "./Carousel-mz";

class EnterpriseItem extends Component {
  renderImages(images) {
    const content = _.map(images, image => image.url);
    return (
      <Carousel
        className="open-enterprises"
        carouselId={this.props.enterprise.id}
        options={{ fullWidth: true, indicators: true }}
        images={content}
      />
    );
  }

  render() {
    const { enterprise } = this.props;
    return (
      <div className="card horizontal gray-background">
        <div className="card-stacked">
          <div className="card-content item-name left-align">
            {enterprise.name}
          </div>
          <div className="item-date left-align">
            Ends on {moment(enterprise.endDate).format("MM-DD-YYYY")}
          </div>
          <div className="card-content item-description left-align">
            {enterprise.shortDescription}
          </div>
          <div className="right-align">
            <Link to={`/application/${enterprise.id}`} className="btn">
              Review Application
            </Link>
          </div>
        </div>
        <div className="crop">
          {!_.isEmpty(enterprise.Images) ? (
            this.renderImages(enterprise.Images)
          ) : (
            <img src={enterprise.image1} />
          )}
        </div>
      </div>
    );
  }
}

const renderName = name => {
  return name.length > 15 ? `${name.substring(0, 15)}...` : name;
};
export default EnterpriseItem;
