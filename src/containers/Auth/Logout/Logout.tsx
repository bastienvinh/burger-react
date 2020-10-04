import React, { FC, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { AnyAction } from 'redux'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import { logout } from '../../../store/actions/auth'


const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  onLogout: () => dispatch(logout())
})

type ReduxDispatch = ReturnType<typeof mapDispatchToProps>

interface IProps extends ReduxDispatch {}

const Logout: FC<IProps> = props => {
  const { onLogout } = props

  useEffect(() => {
    onLogout()
  }, [onLogout])

  return <Redirect to="/" />
}

export default connect(null, mapDispatchToProps)(Logout)