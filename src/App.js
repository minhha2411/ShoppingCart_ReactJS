

import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
 
} from "react-router-dom";
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import Admin from './components/Admin'
import store from './store';
import {Provider} from 'react-redux';


export default class App extends Component {


 
  render() {

    return (
      <div className='app'>
         <Provider store={store}>
        <Router>
       
          <Header></Header>
          <Switch>
           <Route path='/admin' component={Admin}/>
            <Route path='/' component={Main}/>
          </Switch>
        </Router>
        <Footer></Footer>
        </Provider>
       
      </div>
    )
  }
}

