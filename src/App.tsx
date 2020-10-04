import React, { Dispatch, FC, Suspense, useEffect } from 'react';
import { Redirect, Switch, withRouter } from 'react-router-dom'

import './App.css';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import { Route } from 'react-router-dom'
import Logout from './containers/Auth/Logout/Logout'

import { connect  } from 'react-redux'

import { AUTH_ACTION } from 'store/types'
import { authCheckState } from 'store/actions/auth'
import { RootState } from 'store/store'

const AsyncCheckout = React.lazy(() => import('./containers/Checkout/Checkout'))
const AsyncOrders = React.lazy(() => import('./containers/Orders/Orders'))
const AsyncAuth = React.lazy(() => import('./containers/Auth/Auth'))

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.auth.token !== null
})

const mapDispatchToProps = (dispatch: Dispatch<AUTH_ACTION>) => ({
  onTryAutoSignup: () => dispatch(authCheckState())
})

type reduxState = ReturnType<typeof mapStateToProps>
type reduxDispatch = ReturnType<typeof mapDispatchToProps>

interface IProps extends reduxDispatch, reduxState { }

const App: FC<IProps> = props => {

  const { onTryAutoSignup } = props

  useEffect(() => {
    onTryAutoSignup()
  }, [onTryAutoSignup])

  let routes = (
    <Switch>
      <Route path="/auth" component={AsyncAuth} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  )

  if (props.isAuthenticated) {
    routes = <Switch>
      <Route path="/checkout" component={AsyncCheckout} />
      <Route path="/orders" component={AsyncOrders} />
      <Route path="/logout" component={Logout} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  }

  return <div className="App">
    <Suspense fallback={<div>... loading</div>} >
      <Layout>
        {routes}
      </Layout>
    </Suspense>
  </div>

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App) as any)
