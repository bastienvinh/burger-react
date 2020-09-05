import React, { FunctionComponent }   from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

interface IProps {
}

const NavigationItems : FunctionComponent<IProps> = () => <ul className={classes.NavigationItems}>
  <NavigationItem link="/" active>Burger Builder</NavigationItem>
  <NavigationItem link="/">Checkout</NavigationItem>
</ul>

export default NavigationItems