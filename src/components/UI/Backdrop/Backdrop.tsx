import React, { FunctionComponent } from 'react'

import classes from './Backdrop.module.css'

interface IProps {
  show: boolean,
  clicked: () => void
}

const Backdrop: FunctionComponent<IProps> = props => props.show ? <div onClick={props.clicked} className={classes.Backdrop}></div> : null

export default Backdrop