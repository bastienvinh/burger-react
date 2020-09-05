import React, { FunctionComponent } from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'

import classes from './SideDrawer.module.css'

interface IProps {}

const SideDrawer: FunctionComponent<IProps> = _props => <div className={classes.SideDrawer}>
  <div className={classes.Logo}>
    <Logo />
  </div>
  <nav>
    <NavigationItems />
  </nav>
</div>

export default SideDrawer