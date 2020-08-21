import React from 'react'
import * as d3 from "d3";
import { colors, margin } from '../../utils/figure'
import '../../style/style.scss'

class LineChart extends React.Component {

  componentDidMount() {
    this.drawLine();
  }

  drawLine() {

    const svg = d3.select(`#${this.props.drawData.name}`).append('svg');

    const { width, height, data, format } = this.props.drawData;
    //图表总宽度、总高度、所有字段数据、统计字段值的单位
    const x_name = this.props.drawData.x.name;
    const y_name = this.props.drawData.y.name;
    const x_field = this.props.drawData.x.field;
    const y_field = this.props.drawData.y.field;

    const x = d3.scaleUtc()
          .domain(d3.extent(data, d => new Date(d[x_field]) ))
          .range([margin.left, width - margin.right]);
    
    const y = d3.scaleLinear()
          .domain([0, d3.max(data, d => d[y_field])]).nice()
          .range([height - margin.bottom, margin.top]);
    
    const xAxis = g => g
          .attr('transform', `translate(0, ${height - margin.bottom})`)
          .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
          .call(g => g.select(".domain").remove())
          .call(g => g.append("text")
            .attr('x', width - margin.right - 25)
            .attr('y', margin.bottom + 10)
            .attr("fill", "#6d4c41")
            .attr("text-anchor", "end")
            .text(x_name)
          );

    const yAxis = g => g
          .attr('transform', `translate(${margin.left}, 0)`)
          .call(d3.axisLeft(y).ticks(null, format))
          .call(g => g.select(".domain").remove())
          .call(g => g.append('text')
            .attr("x", - margin.left + 10)
            .attr('y', 15)
            .attr("font-weight", "bold")
            .attr("text-anchor", "start")
            .attr("fill", "#6d4c41")
            .text(y_name)
          );

    const line = d3.line()
              .defined(d => !isNaN(d[y_field]))
              .x(d => x( new Date(d[x_field]) ))
              .y(d => y(d[y_field]));

    svg.append('g')
        .call(xAxis);

    svg.append('g')
        .call(yAxis);

    svg.append('path')
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", colors[0])
        .attr("stroke-width", 2)
        .transition()
        .duration(1200)
        .attr('d', line);
  }

  render() {
    return(
      <div id={this.props.drawData.name} className="viewBar">
        <h2>{this.props.drawData.title}</h2>
      </div>
    );
  }
}

export default LineChart;