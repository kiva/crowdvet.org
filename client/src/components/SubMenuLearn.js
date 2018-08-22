import React from 'react';
import {Link} from 'react-router-dom'
import "./SubMenuLearn.css";

const SubMenu = (props) => {

  return (
    <div className="row center-align dashboard" style={{height:"50px"}}>
        <div  className="col s4"><Link className="btn-flat white-text btn-submenu line-50" to={"/learn"}>About Us</Link></div>
        <div  className="col s4"><Link className="btn-flat white-text btn-submenu line-50" to={"/how-works"}>How CrowdVet Works</Link></div>
        <div  className="col s4"><Link className="btn-flat white-text btn-submenu line-50" to={"further-reading"}>Further Reading</Link></div>
    </div>
  )

}

export default SubMenu;
