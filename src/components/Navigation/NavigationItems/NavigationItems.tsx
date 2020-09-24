import React, { FunctionComponent }   from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

interface IProps {
}

const NavigationItems : FunctionComponent<IProps> = () => <ul className={classes.NavigationItems}>
  <NavigationItem exact link="/">Burger Builder</NavigationItem>
  <NavigationItem exact link="/Orders">Orders</NavigationItem>
  <NavigationItem exact link="/auth">Authentificate</NavigationItem>
</ul>

export default NavigationItems