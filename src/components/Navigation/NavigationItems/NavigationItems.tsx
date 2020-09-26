import React, { FunctionComponent }   from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

interface IProps {
  isAuthenticated?: boolean
}

const NavigationItems : FunctionComponent<IProps> = props => <ul className={classes.NavigationItems}>
  <NavigationItem exact link="/">Burger Builder</NavigationItem>
  <NavigationItem exact link="/Orders">Orders</NavigationItem>
  {props.isAuthenticated ?  <NavigationItem exact link="/logout">Logout</NavigationItem> : <NavigationItem exact link="/auth">Authentificate</NavigationItem>}
</ul>

export default NavigationItems