import React, { Component, ErrorInfo } from 'react'
import Aux from '../Aux/Aux'
import Modal from '../../components/UI/Modal/Modal'
import { AxiosInstance } from 'axios'
// import axios from 'axios'

interface IProps {
  axios?: AxiosInstance
}
interface IState {
  hasError: boolean
  error: any
}

// Use this tutorial : https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html
class WidthErrorHandler extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
    }
  }

  componentDidMount() {

    if (this.props.axios) {
      this.props.axios.interceptors.request.use(config => {
        this.setState({ error: null })
        return config
      })
      this.props.axios.interceptors.response.use(config => config, error => this.setState({ error }))
    }

    
  }

  componentDidCatch(_error: Error, _errorInfo: ErrorInfo) {
    this.setState({ hasError: true })
  }

  modalClosedhandler() {
    this.setState({ hasError: false, error: null })
  }

  render() {
    return <Aux>
      <Modal show={this.state.error} modalClosed={this.modalClosedhandler.bind(this)}>
        {this.state.error ? this.state.error.message : null}
      </Modal>
      <Modal show={this.state.hasError} modalClosed={this.modalClosedhandler.bind(this)}>
        Something didn't work very well!
      </Modal>
      {this.props.children}
    </Aux>
  }
}

export default WidthErrorHandler