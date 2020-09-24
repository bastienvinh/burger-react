import React, { Component } from 'react'
import { connect } from 'react-redux'

import Aux from '../../hoc/Aux/Aux'
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import { RootState } from 'store/store'

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.auth.token !== null
})

type ReduxState = ReturnType<typeof mapStateToProps>

interface IProps extends ReduxState {
  children: React.ReactElement
}
interface IState {
  showSideDrawer: boolean
}

class Layout extends Component<IProps, IState> {

  state = {
    showSideDrawer: false
  }

  sideDrawerClosedHandler() {
    this.setState({ showSideDrawer: false })
  }

  sideDrawerToggleHandler() {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer }
    })
  }

  render() {
    return <Aux>
      <Toolbar isAuth={this.props.isAuthenticated} drawerToggleClicked={this.sideDrawerToggleHandler.bind(this)} />
      <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler.bind(this)} />
      <main className={classes.Content}>
        {this.props.children}
      </main>
    </Aux>
  }
}

export default connect(mapStateToProps)(Layout)