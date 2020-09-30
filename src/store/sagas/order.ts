import { purchasesBurgerSuccess, purchaseBurgerFail, purchaseBurgerStart, fetchOrderStart, fetchOrderSuccess, fetchOrderFail } from '../actions/order'
import { PURCHASE_BURGER_ACTION } from '../types'
import OrderService from '../../services/ordersService'
import { put } from 'redux-saga/effects'

export function* purchaseBurgerSaga(action: PURCHASE_BURGER_ACTION) {
  try {
    yield put(purchaseBurgerStart())
    const order = yield OrderService.getInstance().create(action.payload)
    yield put(purchasesBurgerSuccess(order.id!, order))
  }
  catch {
    yield put(purchaseBurgerFail(true))
  }
}

export function* fetchOrdersSaga(action: any) {
  try {
    yield put(fetchOrderStart())
    const orders = yield OrderService.getInstance().getAll()
    yield put(fetchOrderSuccess(orders))
  }
  catch {
    yield put(fetchOrderFail(true))
  }
}