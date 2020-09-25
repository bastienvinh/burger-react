import { AUTH_ACTION, AuthState, AUTH_START, AUTH_SUCCESS, AUTH_FAIL, AUTH_LOGOUT, SET_AUTH_REDIRECT_PATH } from '../types' 
import { updateObject } from '../utility'

const initialState: AuthState = {
  error: null,
  token: null,
  userId: null,
  loading: false,
  authRedirectPath: '/'
}

const reducer = (state: AuthState = initialState, action: AUTH_ACTION) : AuthState => {
  switch (action.type) {
    case AUTH_START: 
      return updateObject(state, { loading: true, error: null })
    case AUTH_SUCCESS:
      return updateObject(state, { token: action.payload.token, userId: action.payload.userId , error: null, loading: false })
    case AUTH_FAIL:
      return updateObject(state, { error: action.payload, loading: false })
    case AUTH_LOGOUT:
      return updateObject(state, { token: null, userId: null })
    case SET_AUTH_REDIRECT_PATH:
      return updateObject(state, { authRedirectPath: action.payload } )
    default:
      return state
  }
}

export default reducer