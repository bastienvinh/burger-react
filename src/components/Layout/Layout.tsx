import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

interface IProps {}
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
      <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler.bind(this)} />
      <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler.bind(this)} />
      <main className={classes.Content}>
        {this.props.children}
      </main>
    </Aux>
  }
}

export default Layout