import React, { Component } from "react";

class Dots extends Component {
  render() {

    //remove last & first point
    // var data=this.props.data.splice(1);
    // data.pop();
    const _self = this
    const data = this.props.data
    var circles = data.map(function(d, i) {
      return (
        <circle
          className="dot"
          r="7"
          cx={_self.props.x(d.score)}
          cy={_self.props.y(d.count)}
          fill="#7dc7f4"
          stroke="white"
          strokeWidth="5px"
          key={i}
        >
          {" "}
        </circle>
      );
    });

    return <g>{circles}</g>;
  }
}

export default Dots;
