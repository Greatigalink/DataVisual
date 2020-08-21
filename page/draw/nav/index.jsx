import React from 'react'
import { Menu, Button } from 'antd';
import {
  FullscreenOutlined,
  FullscreenExitOutlined,
  BarChartOutlined,
  AreaChartOutlined,
} from '@ant-design/icons';
import '../style.scss'


class AsideNav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }


  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  handleClick = (e) => {
    this.props.handleClick(e);
  }

  render() {
    return(
      <div 
        className="draw-nav" 
        style={{width: this.state.collapsed ? 85 : 170}}
      >
        <Button 
          type={this.state.collapsed ? "primary" : ""}  
          onClick={this.toggleCollapsed} 
          style={{marginBottom: 20}} 
          block
        >
          {this.state.collapsed ? <FullscreenOutlined /> : <FullscreenExitOutlined />}
        </Button>
        <Menu
          mode="inline"
          theme="light"
          selectedKeys={`[${this.props.name}]`}
          onClick={this.handleClick}
          inlineCollapsed={this.state.collapsed}
        >
          <Menu.Item key="bar" icon={<BarChartOutlined />} >
            柱状图
          </Menu.Item>
          <Menu.Item key="groupBar" icon={<AreaChartOutlined />} >
            分组柱状图
          </Menu.Item>
          <Menu.Item key="line" icon={<AreaChartOutlined />} >
            折线图
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default AsideNav;