import React, { FunctionComponent } from 'react'
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems'


interface IProps {}

const Toolbar : FunctionComponent<IProps> = _props => <header className={classes.Toolbar}>
  <div>Menu</div>
  <div className={classes.Logo}>
    <Logo />
  </div>
  <NavigationItems />
</header>

export default Toolbar