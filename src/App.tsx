import React, { Component } from 'react';
import { Redirect, Switch, withRouter } from 'react-router-dom'

import './App.css';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import { Route } from 'react-router-dom'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'

import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'

import { authCheckState } from 'store/actions/auth'
import { RootState } from 'store/store';

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.auth.token !== null
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  onTryAutoSignup: () => dispatch(authCheckState())
})


type reduxState = ReturnType<typeof mapStateToProps>
type reduxDispatch = ReturnType<typeof mapDispatchToProps>


interface IProps extends reduxDispatch, reduxState {}

interface IState {}

class App extends Component<IProps, IState> {

  componentDidMount() {
    this.props.onTryAutoSignup()
  }
  
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = <Switch>
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders" component={Orders} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    }

    return <div className="App">
        <Layout>
          {routes}
        </Layout>
      </div>
  }
}

export default  withRouter(connect(null, mapDispatchToProps)(App) as any)
