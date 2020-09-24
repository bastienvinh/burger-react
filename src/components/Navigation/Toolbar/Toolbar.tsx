import React, { FunctionComponent } from 'react'
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

interface IProps {
  drawerToggleClicked: () => void
  isAuth: boolean
}

const Toolbar : FunctionComponent<IProps> = props => <header className={classes.Toolbar}>
  <DrawerToggle clicked={props.drawerToggleClicked} />
  <div className={classes.Logo}>
    <Logo />
  </div>
  <nav className={classes.DesktopOnly}>
    <NavigationItems isAuthenticated={props.isAuth} />
  </nav>
</header>

export default Toolbar