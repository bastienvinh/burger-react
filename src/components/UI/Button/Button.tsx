import React, { FunctionComponent } from 'react'
import classes from './Button.module.css'

interface IProps {
  btnType: string
  clicked?: () => void
}

const Button : FunctionComponent<IProps> = props => <button onClick={props.clicked} className={[classes.Button, classes[props.btnType]].join(' ')}>{props.children}</button>

export default Button