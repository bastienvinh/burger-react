import React, { Component, ErrorInfo } from 'react'
import Aux from '../Aux/Aux'
import Modal from '../../components/UI/Modal/Modal'

interface IProps {}
interface IState {
  hasError: boolean,
  error: Error | null,
  errorInfo: ErrorInfo | null
}

// Use this tutorial : https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html
class WidthErrorHandler extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ hasError: true })
  }

  modalClosedhandler() {
    console.log("Modal Error has closed")
  }

  render() {
    return <Aux>
      <Modal show={true} modalClosed={this.modalClosedhandler}>
        Something didn't work very well!
      </Modal>
      {this.props.children}
    </Aux>
  }
}

export default WidthErrorHandler