import React, { Component } from "react";
import * as d3 from "d3";
import "./Chart.css";
import Axis from "./Axis";
import Dots from "./Dots";

class LineChart extends Component {
  render() {
    var data = [
      { score: 1, count: 180 },
      { score: 2, count: 250 },
      { score: 3, count: 150 },
      { score: 4, count: 496 },
      { score: 5, count: 140 },
      { score: 6, count: 380 }
    ];
    var margin = { top: 5, right: 50, bottom: 20, left: 50 },
      w = this.props.width - (margin.left + margin.right),
      h = this.props.height - (margin.top + margin.bottom);

    var x = d3
      .scaleBand()
      .domain(
        data.map(function(d) {
          return d.score;
        })
      )
      .rangeRound([0, this.props.width])
      .padding(0.3);

    var y = d3
      .scaleLinear()
      .domain([0, 500])
      .range([this.props.height, 0]);

    var rectForeground = data.map(function(d, i) {
      return (
        <rect
          fill="#74d3eb"
          rx="3"
          ry="3"
          key={i}
          x={x(d.score)}
          y={y(d.count)}
          className="shadow"
          height={h - y(d.count)}
          width={x.bandwidth()}
        />
      );
    });

    var transform = "translate(" + margin.left + "," + margin.top + ")";
    var yAxis = d3.axisLeft(y).ticks(5);
    var xAxis = d3.axisBottom(x);

    return (
      <div>
        <svg
          id={this.props.chartId}
          width={this.props.width}
          height={this.props.height}
        >
          <g transform={transform}>
            <Axis h={h} axis={yAxis} axisType="y" />
            <Axis h={h} axis={xAxis} axisType="x" />
            {rectForeground}
          </g>
        </svg>
      </div>
    );
  }
}

LineChart.defaultProps = {
  width: 800,
  height: 300,
  chartId: "v1_chart"
};

export default LineChart;
