import React, { FC, useState } from 'react'
import Aux from '../../hoc/Aux/Aux'
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

interface IProps {}

const Layout: FC<IProps> = props => {

  const [showSideDrawer, setShowSideDrawer] = useState(false)

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false)
  }

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer(prevState => !prevState)
  }

 return <Aux>
      <Toolbar drawerToggleClicked={sideDrawerToggleHandler} />
      <SideDrawer open={showSideDrawer} closed={sideDrawerClosedHandler} />
      <main className={classes.Content}>
        {props.children}
      </main>
    </Aux>
  
}

export default Layout