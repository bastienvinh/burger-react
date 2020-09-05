import React, { FunctionComponent }  from 'react'

import burgerLogo from '../../assets/images/burger-logo.png'
import classes from './Logo.module.css'

interface IProps {
  height?: string
}

const Logo : FunctionComponent<IProps> = props => <div className={classes.Logo} style={{ height: props.height }}>
  <img src={burgerLogo} alt="My Burger" />
</div>

export default Logo