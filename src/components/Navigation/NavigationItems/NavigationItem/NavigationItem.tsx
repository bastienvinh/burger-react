import React, { FunctionComponent } from 'react'
import { NavLink } from 'react-router-dom'

import classes from './NavigationItem.module.css'

interface IProps {
  link: string
  exact?: boolean
}

const NavigationItem : FunctionComponent<IProps> = props => <li className={classes.NavigationItem}>
  <NavLink exact={props.exact} className={classes.A} activeClassName={classes.active} to={props.link}>{props.children}</NavLink>
</li>

export default NavigationItem