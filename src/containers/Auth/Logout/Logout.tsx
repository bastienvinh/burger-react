import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { AnyAction } from 'redux'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import { logout } from '../../../store/actions/auth'


const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  onLogout: () => dispatch(logout())
})

type ReduxDispatch = ReturnType<typeof mapDispatchToProps>

interface IProps extends ReduxDispatch {

}

class Logout extends Component<IProps> {

  componentDidMount() {
    this.props.onLogout()
  }

  render() {
    return <Redirect to="/" />
  }
}

export default connect(null, mapDispatchToProps)(Logout)