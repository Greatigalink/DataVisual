import React from 'react'
import * as d3 from "d3";
import {colors, margin} from '../../utils/figure'
import '../../style/style.scss'

class BarChart extends React.Component {

  componentDidMount() {
    this.drawBar();
  }

  drawBar() {
    //单组统计柱状图
    const svg = d3.select(`#${this.props.drawData.name}`).append('svg');//选中父元素，id唯一

    const { width, height, data, format } = this.props.drawData;
    //图表总宽度、总高度、所有字段数据、统计字段值的单位
    const x_name = this.props.drawData.x.name;//x轴数量单位描述
    const x_field = this.props.drawData.x.field;//x轴统计字段名
    const y_name = this.props.drawData.y.name;//y轴数量单位描述
    const y_field = this.props.drawData.y.field;//y轴统计字段名

    const x = d3.scaleBand()
        .domain(d3.range(data.length))
        .range([margin.left, width - margin.right])
        .padding(0.1);
    
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d[y_field])])
        .range([height - margin.bottom, margin.top]);

    const xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickFormat(i => data[i][x_field]).tickSizeOuter(0))
        .call(g => g.select(".domain").remove())
        .call(g => g.append("text")
          .attr('x', width - margin.right - 10)
          .attr('y', margin.bottom + 10)
          .attr("fill", "#6d4c41")
          .attr("text-anchor", "end")
          .text(x_name)
        );
    
    const yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(null, format))
        .call(g => g.select(".domain").remove())
        .call(g => g.append("text")
          .attr("x", - margin.left + 10)
          .attr("y", 15)
          .attr("fill", "#6d4c41")
          .attr("text-anchor", "start")
          .text(y_name)
        );
  
    const barText = (data) => {
      switch(format) {
        case '%': return `${(data * 100).toFixed(1)}%`;
        case 's': 
          if(data.toFixed().length > 6) {
            return `${(data / 1000000).toFixed(1)}M`;
          } else if(data.toFixed().length > 3) {
            return `${(data / 1000).toFixed(1)}K`;
          } else {
            return data.toFixed(2);
          };
        default: break;
      }
    };

    const textOffset = (data) => {
      let offset = 0.2;
      switch(format) {
        case '%': offset = 3.5;break;
        case 's': 
          if(data.toFixed().length > 6) {
            offset = (data / 1000000).toFixed().length + 2;
          } else if(data.toFixed().length > 3){
            offset = (data / 1000).toFixed().length + 2;
          } else {
            offset = data.toFixed().length + 2;
          };
        break;
        default: break;
      }
      return (x.bandwidth() - x.bandwidth() * offset  * 0.2) / 2;
    } 

    svg.append('g')
        .attr('fill', colors[0])
      .selectAll('rect')
      .data(data)
      .join('rect')
        .attr('stroke', '#212121')
        .attr('stroke-width', 0.3)
        .attr('x', (d, i) => x(i))
        .attr('y', height - margin.bottom)
        .attr('width', x.bandwidth())
        .attr('height', 0)
        .transition()
        .duration(1000)
        .attr('height', d => y(0) - y(d[y_field]))
        .attr('y', d => y(d[y_field]));
    
    if(data.length <= 50) {
      svg.append('g')
        .attr('fill', 'black')
        .attr('font-size', x.bandwidth() * 0.3 )
      .selectAll('text')
      .data(data)
      .join('text')
        .attr('x', (d, i) => x(i) + textOffset(d[y_field]))
        .attr('y', height - margin.bottom)
        .text(d => `${ barText(d[y_field]) }`)
        .transition()
        .duration(1000)
        .attr('y', d => y(d[y_field]) - x.bandwidth() * 0.1);
    }
    
    svg.append('g')
        .call(xAxis);

    svg.append('g')
        .call(yAxis);
  }

  render() {
    return(
      <div id={this.props.drawData.name} className="viewBar">
        <h2>{this.props.drawData.title}</h2>
      </div>
    );
  }
}

export default BarChart;