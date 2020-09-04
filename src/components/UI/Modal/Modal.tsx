import React, { FunctionComponent } from 'react'
import Aux from '../../../hoc/Aux'
import classes from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop'

interface IProps {
  show: boolean,
  modalClosed: () => void
}

const Modal: FunctionComponent<IProps> = props => 
  <Aux>
    <Backdrop show={props.show} clicked={props.modalClosed} />
    <div style={{
      transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
      opacity: props.show ? '1' : '0'
      }} className={classes.Modal}>{props.children}
    </div>
  </Aux>

export default Modal