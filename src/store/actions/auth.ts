import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL, AUTH_ACTION, AUTH_LOGOUT, SET_AUTH_REDIRECT_PATH } from '../types'
import { AuthData } from '../../types/AllType'
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../store'

import OrderService from '../../services/ordersService'
import IngredientsService from '../../services/ingredientsService'

import axios from 'axios'

export const authStart = () : AUTH_ACTION => {
  return {
    type: AUTH_START
  }
}

export const authSuccess = (authData : AuthData) : AUTH_ACTION => {
  return {
    type: AUTH_SUCCESS,
    payload: authData
  }
}

export const authFail = (error: Error) : AUTH_ACTION => {
  return {
    type: AUTH_FAIL,
    payload: error
  }
}

export const logout = () : AUTH_ACTION => {
  OrderService.getInstance().clear()
  IngredientsService.getInstance().clear()
  localStorage.removeItem('token')
  localStorage.removeItem('expirationDate')
  localStorage.removeItem('userId')
  return {
    type: AUTH_LOGOUT
  }
}

export const checkAuthTimeout = (expirationTime: number) : ThunkAction<void, RootState, null, AUTH_ACTION> => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, expirationTime * 1000)
  }
}

export const setAuthRedirectPath = (path: string) : AUTH_ACTION => {
  return {
    type: SET_AUTH_REDIRECT_PATH,
    payload: path
  }
} 

export const auth = (email: string, password: string, isSignup: boolean ) : ThunkAction<void, RootState, null, AUTH_ACTION> => {
  return async dispatch => {

    // const response = await axios.post
    dispatch(authStart())
    const authData = {
      email,
      password,
      returnSecureToken: true
    }

    try {
      let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`
      if (!isSignup) {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`
      }
      const firebaseData = await axios.post(url, authData).then(response => response.data)

      // Set the auth on each service
      OrderService.getInstance().setAuth(firebaseData.idToken)
      OrderService.getInstance().setUserId(firebaseData.localId)
      IngredientsService.getInstance().setAuth(firebaseData.idToken)

      const expirationDate = new Date(new Date().getTime() + firebaseData.expiresIn * 1000)
      localStorage.setItem('token', firebaseData.idToken)
      localStorage.setItem('expirationDate', expirationDate.toDateString())
      localStorage.setItem('userId', firebaseData.localId)

      dispatch(authSuccess({ token: firebaseData.idToken, userId: firebaseData.localId }))
      dispatch(checkAuthTimeout(+firebaseData.expiresIn))
    }
    catch (e) {
      OrderService.getInstance().clear()
      IngredientsService.getInstance().clear()
      dispatch(authFail(e))
    }
  }
}

export const authCheckState = () : ThunkAction<void, RootState, null, AUTH_ACTION> => {
  
  return async dispatch => {
    const token = localStorage.getItem('token')
    if (!token) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate')!)
      if (expirationDate.getTime() <= new Date().getTime()) {
        dispatch(logout())
      }
      else {
        const userId = localStorage.getItem('userId')!
        dispatch(authSuccess({ token, userId }))
        dispatch(checkAuthTimeout(expirationDate.getTime() - new Date().getTime() / 1000))
      }

    }

  }
}