import React from 'react'
import { Link } from 'react-router-dom'
import './style.scss'

class Nav extends React.Component {

  render() {
    return(
      <nav className="nav">
        <section>
          <aside>Data Visualization</aside>
        </section>
        <section>
          <ul>
            <li>
              <Link to="/home" className="nav-link">首页</Link>
            </li>
            <li>
              <Link to="/draw" className="nav-link">渲染</Link>
            </li>
          </ul>
        </section>
      </nav>
    );
  }
}

export default Nav;