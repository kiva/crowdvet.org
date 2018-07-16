import React from 'react';
import { Link } from 'react-router-dom';
import './Vetted.css';
import _ from 'lodash'

const EnterpriseItem = ({ enterprise, officialEvaluation }) => {
  const investment = _.get(officialEvaluation, "status") ? officialEvaluation.status :"Pending"
  return (
    <div className="col s12 m4">
    <div className="card">
      <div className="card-image">
        <div className="crop-vetted">
        <img src={enterprise.image1}/>
        <div className="card-title flow-text">
          <p id="investment-card">investment {investment}:</p>
          <p  id="card-vetted">
          {renderName(enterprise.name)}
          </p>
          <Link to={`/application/${enterprise.id}`} id="read-card">Read More >></Link>
        </div>
        </div>
      </div>
    </div>
    </div>
  );
};

const renderName = (name) => {
  return name.length > 15 ? `${name.substring(0,15)}...` : name
}
export default EnterpriseItem;
