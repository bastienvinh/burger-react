import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL, AUTH_ACTION,  SET_AUTH_REDIRECT_PATH, AUTH_INITIATE_LOGOUT, AUTH_LOGOUT, AUTH_CHECK_TIMEOUT, AUTH_USER, AUTH_CHECK_INITIAL_STATE } from '../types'
import { AuthData } from '../../types/AllType'
// import { ThunkAction } from 'redux-thunk'
// import { RootState } from '../store'

// import OrderService from '../../services/ordersService'
// import IngredientsService from '../../services/ingredientsService'

// import axios from 'axios'

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
  return {
    type: AUTH_INITIATE_LOGOUT
  }
}

export const logoutSucceed = () : AUTH_ACTION => {
  return {
    type: AUTH_LOGOUT
  }
}

export const checkAuthTimeout = (expirationTime: number) : AUTH_ACTION => {
  return {
    type: AUTH_CHECK_TIMEOUT,
    payload: expirationTime
  }
}

export const setAuthRedirectPath = (path: string) : AUTH_ACTION => {
  return {
    type: SET_AUTH_REDIRECT_PATH,
    payload: path
  }
} 

export const auth = (email: string, password: string, isSignup: boolean ) : AUTH_ACTION => {
  return {
    type: AUTH_USER,
    payload: {
      email,
      password,
      isSignup
    }
  }
}

export const authCheckState = () : AUTH_ACTION => {
  return {
    type: AUTH_CHECK_INITIAL_STATE
  }
}