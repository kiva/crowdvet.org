import React from 'react';
import { Link } from 'react-router-dom';
import moment from "moment";

const EnterpriseItem = ({ enterprise}) => {
  return (
    <div className="card horizontal gray-background">
      <div className="card-stacked">
        <div className="card-content item-name left-align">
          {renderName(enterprise.name)}
        </div>
        <div className="item-date left-align">Ends on {moment(enterprise.endDate).format("MM-DD-YYYY")}</div>
        <div className="card-content item-description">
          {enterprise.description.substring(0,130)}...
        </div>
        <div className="right-align">
          <Link to={`/application/${enterprise.id}`} className="btn">review application</Link>
        </div>
      </div>
      <div className="crop" >
        <img src={enterprise.image1}/>
      </div>
    </div>
  );
};

const renderName = (name) => {
  return name.length > 15 ? `${name.substring(0,15)}...` : name
}
export default EnterpriseItem;
