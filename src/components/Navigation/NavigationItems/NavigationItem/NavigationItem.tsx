import React, { FunctionComponent } from 'react'

import classes from './NavigationItem.module.css'

interface IProps {
  active?: boolean
  link: string
}

const NavigationItem : FunctionComponent<IProps> = props => <li className={classes.NavigationItem}>
  <a className={props.active ? classes.active : ''} href={props.link}>{props.children}</a>
</li>

export default NavigationItem