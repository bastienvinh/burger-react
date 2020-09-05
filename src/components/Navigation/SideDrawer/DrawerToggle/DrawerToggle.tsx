import React, { FunctionComponent }   from 'react'
import classes from './DrawerToggle.module.css'

interface IProps {
  clicked: () => void
}

const DrawerToggle: FunctionComponent<IProps> = props => <div className={classes.DrawerToggle} onClick={props.clicked}>
  <div></div>
  <div></div>
  <div></div>
</div>

export default DrawerToggle