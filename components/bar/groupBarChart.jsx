import React from 'react'
import * as d3 from "d3";
import { margin } from '../../utils/figure'
import '../../style/style.scss'

class GroupBarGraph extends React.Component {

  componentDidMount() {
    this.drawBar();
  }

  drawBar() {
    const svg = d3.select(`#${this.props.drawData.name}`).append('svg');

    const { width, height, data, format} = this.props.drawData;
    //图表总宽度、总高度、所有字段数据、统计字段值的单位（即 y轴显示单位）
    const groupKey = this.props.drawData.x.field;//x轴统计字段名
    const keys = this.props.drawData.y.field;//y轴统计字段名
    const x_name = this.props.drawData.x.name;//x轴数量单位描述
    const y_name = this.props.drawData.y.name;//y轴数量单位描述
    

    const x0 = d3.scaleBand()
        .domain(data.map(d => d[groupKey]))
        .rangeRound([margin.left, width - margin.right])
        .paddingInner(0.2);

    const x1 = d3.scaleBand()
        .domain(keys)
        .rangeRound([0, x0.bandwidth()])
        .paddingInner(0.05);
    
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d3.max(keys, key => d[key]))]).nice()
        .rangeRound([height - margin.bottom, margin.top]);

    const xAxis = g => g
        .attr("transform", `translate(0, ${height - margin.bottom})`)
        .call(d3.axisBottom(x0).tickSizeOuter(0))
        .call(g => g.select('.domain').remove())
        .call(g => g.append('text')
          .attr('x', width - margin.right - 10)
          .attr('y', margin.bottom + 10)
          .attr('fill', '#6d4c41')
          .attr("text-anchor", "end")
          .text(x_name)
        );

    const yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(null, format))
        .call(g => g.select('.domain').remove())
        .call(g => g.append('text')
          .attr('x', - margin.left + 10)
          .attr('y', 15)
          .attr('fill', '#6d4c41')
          .attr("text-anchor", "start")
          .text(y_name)
        );

    const color = d3.scaleOrdinal()
        .domain(keys)
        .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), keys.length).reverse());

    const legend = svg => {
      const g = svg
          .attr("transform", `translate(${width},0)`)
          .attr("text-anchor", "end")
          .attr("font-family", "sans-serif")
          .attr("font-size", 10)
        .selectAll("g")
        .data(color.domain().slice().reverse())
        .join("g")
          .attr("transform", (d, i) => `translate(0,${i * 20})`);

      g.append("rect")
          .attr("x", -19)
          .attr("width", 19)
          .attr("height", 19)
          .attr("fill", color);

      g.append("text")
          .attr("x", -24)
          .attr("y", 9.5)
          .attr("dy", "0.35em")
          .text(d => d);
    }

    svg.append('g')
      .selectAll('g')
      .data(data)
      .join('g')
        .attr("transform", d => `translate(${x0(d[groupKey])},0)`)
      .selectAll('rect')
      .data(d => keys.map(key => ({key, value: d[key]})))
      .join('rect')
        .attr('stroke', '#212121')
        .attr('stroke-width', 0.3)
        .attr('x', d => x1(d.key))
        .attr('y', height - margin.bottom)
        .attr("width", x1.bandwidth())
        .attr("height", 0)
        .attr('fill', d => color(d.key))
        .transition()
        .duration(1000)
        .attr('y', d => y(d.value))
        .attr("height", d => y(0) - y(d.value));
    
    svg.append('g')
        .call(xAxis);
    
    svg.append('g')
        .call(yAxis);
    
    svg.append('g')
        .call(legend);
    
  }

  render() {
    return(
      <div id={this.props.drawData.name} className="viewBar">
        <h2>{this.props.drawData.title}</h2>
      </div>
    );
  }
}

export default GroupBarGraph;