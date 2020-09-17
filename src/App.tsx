import React, { Component } from 'react';
import { Switch } from 'react-router-dom'

import './App.css';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import { Route } from 'react-router-dom'

interface IProps {}

interface IState {}

class App extends Component<IProps, IState> {
  
  render() {
    return <div className="App">
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
  }
}

export default App;
