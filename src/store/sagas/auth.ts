import OrderService from '../../services/ordersService'
import IngredientsService from '../../services/ingredientsService'

import { put, delay } from 'redux-saga/effects'
import { logoutSucceed, logout, authStart, authSuccess, checkAuthTimeout, authFail } from '../actions/auth'
import {  AUTH_CHECK_INITIAL_STATE_ACTION, AUTH_CHECK_TIMEOUT_ACTION } from 'store/types'

import axios from 'axios'

export function* logoutSaga(_action : any) {
  yield OrderService.getInstance().clear()
  yield IngredientsService.getInstance().clear()
  yield localStorage.removeItem('token')
  yield localStorage.removeItem('expirationDate')
  yield localStorage.removeItem('userId')

  yield put(logoutSucceed())
}

export function* checkAuthTimeoutSaga(action: AUTH_CHECK_TIMEOUT_ACTION) {
  yield delay(action.payload * 1000) // Expiration time
  yield put(logout())
}

export function* authUserSaga(action: any) {
  yield put(authStart())
// dispatch(authStart())
  const authData = {
    email : action.payload.email,
    password : action.payload.password,
    returnSecureToken: true
  }

  try {
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`
    if (!action.payload.isSignup) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`
    }
    const firebaseData = yield axios.post(url, authData).then(response => response.data)

    // Set the auth on each service
    yield OrderService.getInstance().setAuth(firebaseData.idToken)
    // yield OrderService.getInstance().setUserId(firebaseData.localId)
    yield IngredientsService.getInstance().setAuth(firebaseData.idToken)

    const expirationDate =  yield new Date(new Date().getTime() + firebaseData.expiresIn * 1000)
    yield localStorage.setItem('token', firebaseData.idToken)
    yield localStorage.setItem('expirationDate', expirationDate.toDateString())
    yield localStorage.setItem('userId', firebaseData.localId)

    yield put(authSuccess({ token: firebaseData.idToken, userId: firebaseData.localId }))
    yield put(checkAuthTimeout(+firebaseData.expiresIn))
  }
  catch (e) {
    yield OrderService.getInstance().clear()
    yield IngredientsService.getInstance().clear()
    yield put(authFail(e))
  }
}


export function* authCheckStateSaga(_action: AUTH_CHECK_INITIAL_STATE_ACTION) {
  const token = yield localStorage.getItem('token')
    if (!token) {
      yield put(logout())
    } else {
      const expirationDate = yield new Date(localStorage.getItem('expirationDate')!)
      if (expirationDate.getTime() <= new Date().getTime()) {
        yield put(logout())
      }
      else {
        const userId = localStorage.getItem('userId')!
        yield put(authSuccess({ token, userId }))
        yield put(checkAuthTimeout(expirationDate.getTime() - new Date().getTime() / 1000))
      }

    }
}