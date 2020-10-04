import React, { FC, useState } from 'react'
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
const Layout : FC<IProps> = props => {

  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false)

  // state = {
  //   showSideDrawer: false
  // }

  const sideDrawerClosedHandler = () => {
    setSideDrawerIsVisible(false)
    // this.setState({ showSideDrawer: false })
  }

  const sideDrawerToggleHandler = () => {
    // this.setState((prevState) => {
    //   return { showSideDrawer: !prevState.showSideDrawer }
    // })
    setSideDrawerIsVisible(prevState => !prevState)
  }

    return <Aux>
      <Toolbar isAuth={props.isAuthenticated} drawerToggleClicked={sideDrawerToggleHandler} />
      <SideDrawer open={sideDrawerIsVisible} closed={sideDrawerClosedHandler} />
      <main className={classes.Content}>
        {props.children}
      </main>
    </Aux>
}

export default connect(mapStateToProps)(Layout)