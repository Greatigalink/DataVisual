import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import App from '../App'
import Nav from '../components/nav/index'
import Home from '../page/home/index'
import Draw from '../page/draw/index'


class AppRouter extends React.Component {
  render() {
    return(
      <BrowserRouter>
        <Nav />
        <Route path='/app' component={App}/>
        <Route path='/home' component={Home}/>
        <Route path='/draw' component={Draw}/>
      </BrowserRouter>
    );
  }
}

export default AppRouter;