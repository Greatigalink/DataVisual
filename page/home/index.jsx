import React from 'react';
import GitHubDemo from './github/github'
import './style.scss'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <div className="home">
        <header>
          <h1>添加文件或者输入GitHub API</h1>
          <strong>即可实时查看demo</strong>
          <p>同时提供源码</p>
        </header>
        <article className="home-body">
          <GitHubDemo/>
        </article>
      </div>
    );
  }
}

export default Home;