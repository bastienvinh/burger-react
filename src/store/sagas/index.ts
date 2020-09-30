import { all, takeEvery } from 'redux-saga/effects'
import { AUTH_INITIATE_LOGOUT, AUTH_CHECK_TIMEOUT, AUTH_USER, AUTH_CHECK_INITIAL_STATE, INIT_INGREDIENTS, PURCHASE_BURGER, FETCH_ORDER } from '../types'
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga } from './auth'
import { initIngredientsSaga } from './burgerBuilder'
import { purchaseBurgerSaga, fetchOrdersSaga } from './order'

export function* watchAuth() {
  yield all([
    takeEvery(AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(AUTH_USER, authUserSaga),
    takeEvery(AUTH_CHECK_INITIAL_STATE, authCheckStateSaga)
  ])

  
}

export function* watchBurgerBuilder() {
  yield takeEvery(INIT_INGREDIENTS, initIngredientsSaga)
}

export function* watchOrder() {
  yield takeEvery(PURCHASE_BURGER, purchaseBurgerSaga)
  yield takeEvery(FETCH_ORDER, fetchOrdersSaga)
}