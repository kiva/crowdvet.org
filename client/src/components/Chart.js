import React, { Component } from "react";
import * as d3 from "d3";
import "./Chart.css";
import Axis from "./Axis";
import Dots from "./Dots";

class LineChart extends Component {
  render() {
    var data = [
      { score: 0, count: 0 },
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
      .scaleLinear()
      .domain([
        0,
        d3.max(data, function(d) {
          return d.score;
        })
      ])
      .range([0, w]);

    var y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, function(d) {
          return d.count + 100;
        })
      ])
      .range([h, 0]);

    var line = d3
      .line()
      .curve(d3.curveCardinal)
      .x(function(d) {
        return x(d.score);
      })
      .y(function(d) {
        return y(d.count);
      });

    var transform = "translate(" + margin.left + "," + margin.top + ")";

    var yAxis = d3.axisLeft(y).ticks(5);

    var xAxis = d3
      .axisBottom(x)
      .tickValues(
        data
          .map(function(d, i) {
            if (i > 0) return d.score;
          })
          .splice(1)
      )
      .ticks(4);

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
            <path
              className="line shadow"
              d={line(data)}
              strokeLinecap="round"
            />
             <Dots data={data} x={x} y={y}/>
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
