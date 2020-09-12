import React, { FunctionComponent } from 'react'
import classes from './Button.module.css'

interface IProps {
  btnType: 'Danger' | 'Success'
  clicked?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  disable?: boolean
}

const Button : FunctionComponent<IProps> = props => <button 
                                                      disabled={props.disable} 
                                                      onClick={props.clicked} 
                                                      className={[classes.Button, classes[props.btnType]].join(' ')}>
                                                        {props.children}
                                                      </button>

export default Button