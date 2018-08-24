import React from 'react';
import {Link} from 'react-router-dom'
import "./SubMenuLearn.css";

const SubMenu = (props) => {
  const activeClass = "white-text active-text";
  const inactiveClass = "inactive-text";
  return (
    <div className="row center-align dashboard" style={{height:"50px"}}>
        <div  className="col s4"><Link className={`btn-flat btn-submenu line-50 ${props.menu.about.active && activeClass || inactiveClass}`} to={"/learn"}>About Us</Link></div>
        <div  className="col s4"><Link className={`btn-flat btn-submenu line-50 ${props.menu.howWorks.active && activeClass || inactiveClass}`} to={"/how-works"}>How CrowdVet Works</Link></div>
        <div  className="col s4"><Link className={`btn-flat btn-submenu line-50 ${props.menu.further.active && activeClass || inactiveClass}`} to={"further-reading"}>Further Reading</Link></div>
    </div>
  )

}

export default SubMenu;
