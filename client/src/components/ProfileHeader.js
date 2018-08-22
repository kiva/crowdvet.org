import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Enterprises from "./Enterprises";
import VettedEnterprises from "./VettedEnterprises";
import _ from "lodash";
import utils from './utils';
import moment from 'moment';
import camera from "./Camera.svg";
import * as actions from "../actions";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

class ProfileHeader extends Component {
  constructor (props) {
    super(props)
    this.state = {
    src: null,
    crop: {
      x: 10,
      y: 10,
      width:40,
      height:40,
      aspect:1/1
    },
    pixelCrop: {
      x: 10,
      y: 10,
      width:40,
      height:40,
      aspect:1/1
    }
  }

  }

  onCropChange = crop => {
   this.setState({ crop })
  }

  onCropComplete = (crop, pixelCrop) => {
    this.setState({ pixelCrop })
  }

  onClickHandler() {
    const { $ } = window;
    $(this._image).click();
  }

  onChangeHandler(event) {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend =  () => {
        this.setState({
          src: reader.result,
        })
      }
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    var img = new Image();
    img.src = this.state.src;
    const croppedImg = await getCroppedImg(img, this.state.pixelCrop, "profileImg");
    this.props.uploadProfileImage(croppedImg)
    this.setState({ src: null })
  }

  render() {
    const { auth, userEvaluations, officialEvaluations } = this.props;
    // redirect user if not logged
    if (!auth) return null;
    const result = utils.getOverallResults(userEvaluations, officialEvaluations);

    return (
      <div>
        <div className="container">
          <br />
          <div className="row">
            <div className="col s12 m4 l3">
              <div className="thumb"><img src={this.props.auth.image} alt="" className="circle responsive-img" /></div>
              <p className="valign-wrapper" style={{cursor: "pointer"}} onClick={this.onClickHandler.bind(this)}>
                <span><img src={camera} /></span>
                <span className="small valign-wrapper" style={{marginLeft:"5px"}}>Upload New Image</span>
              </p>
            </div>
            <div className="col s12 m8 l9 name">
              {auth.name}
              <div className="score">Score: {result && result.GeneralScore || 0 } | Accuracy: {result && result.GeneralAccuracy || 0 }%</div>
              <div className="community">
                Community Member Since {moment(auth.created_at).format("MMMM DD, YYYY")} | Vetted {result ? result.count : ""} Social
                Enterprises
              </div>
            </div>
          </div>
          <div className="col s12 m8 l8">
          {this.state.src && (
            <ReactCrop
            src={this.state.src}
            crop={this.state.crop}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
            />
            )
          }
          </div>
          <div className="row">
            <div className="col s12">
              <form onSubmit={this.handleSubmit.bind(this)}>
                <input type="file" id="imgupload" onClick={(event)=> { event.target.value = null }}
                onChange={ this.onChangeHandler.bind(this) } style={{display:"none"}} ref={el => { this._image = el; }} />
                    { this.state.src && <input className="btn-flat start-vetting-btn center" style={{paddingTop:"inherit"}} type="submit" value="Submit" />}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({
  auth,
}) {
  return { auth };
}


/**
 * @param {File} image - Image File Object
 * @param {Object} pixelCrop - pixelCrop Object provided by react-image-crop
 * @param {String} fileName - Name of the returned file in Promise
 */
function getCroppedImg(image, pixelCrop, fileName) {

  const canvas = document.createElement('canvas');
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext('2d');

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // As a blob
  return new Promise((resolve, reject) => {
    canvas.toBlob(file => {
      file.name = fileName;
      resolve(file);
    }, 'image/jpeg');
  });
}



export default connect(mapStateToProps, actions)(ProfileHeader);
