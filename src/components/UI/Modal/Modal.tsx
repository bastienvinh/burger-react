import React, { Component } from 'react'
import Aux from '../../../hoc/Aux/Aux'
import classes from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop'

interface IProps {
  show: boolean,
  modalClosed: () => void
  children?: React.ReactNode
}

interface IState {

}

class Modal extends Component<IProps, IState> {
  
  shouldComponentUpdate(nextProps : IProps, _nextState: IState) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children
  }
  
  render() {
    return <Aux>
    <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
    <div style={{
      transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
      opacity: this.props.show ? '1' : '0'
      }} className={classes.Modal}>{this.props.children}
    </div>
  </Aux>
  }
} 
  

export default Modal