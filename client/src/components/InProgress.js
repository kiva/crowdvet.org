import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';
import _ from 'lodash';
import "./InProgress.css"
import Countdown from "react-countdown-now";
import {Carousel} from "react-materialize";


class InProgress extends Component {

  renderImages(images, enterprise) {
    const content = _.map(images, image => image.url)
    return <Carousel className="inprogress-evaluation" carouselId={enterprise.id} options={{ fullWidth: true, indicators:true }} images={content} />;
  }

  renderInProgress(userEvaluations, enterprises) {
    const enterprisesItems = _.map(userEvaluations, (evaluation) => {
      return this.renderInProgressItems(enterprises[evaluation.enterprise_id], evaluation)
    })
    return enterprisesItems;
  }

  onHandleDelete(evaluation) {
    this.props.removeUserEvaluation(evaluation)
  }

  renderInProgressItems(enterprise, evaluation) {
    return (
      <div key={enterprise.id}>
        <div className="col s12 m3">
          <div className="card">
            <div className="card-image" id="card-progress">
            { !_.isEmpty(enterprise.Images) ?
              this.renderImages(enterprise.Images, enterprise) : <img style={{height:"230px"}} src={enterprise.image1} />
            }
            </div>
            <div className="card-content">
              <p>{enterprise.name}</p>
            </div>
            <div className="card-action warning-status">
              <div  id="card-link"><Countdown date={enterprise.endDate} /> left</div>
            </div>
            <div className="card-action card-continue">
              <Link id="card-link" to={`/application/${enterprise.id}`}>Continue Review</Link>
            </div>
            <div className="remove-btn"><Link to={'/vet/enterprises'} onClick={ () => this.onHandleDelete.bind(this)(evaluation)}>Remove</Link></div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {userEvaluations , enterprises} = this.props;
    if (!userEvaluations) return null
    if (!enterprises) return null
    return (
      <div className="">
      <div className="row center">
          {this.renderInProgress(userEvaluations, enterprises)}
      </div>
      </div>
    );
  }
}

export default connect(null, actions)(InProgress);
