import { ThunkAction } from 'redux-thunk'
import { FETCH_ORDERS_START, FETCH_ORDERS_SUCCESS, ORDER_ACTION, PURCHASE_BURGER_FAIL, PURCHASE_BURGER_START, PURCHASE_BURGER_SUCCESS, PURCHASE_INIT } from '../types'
import { RootState } from '../store'
import Order from 'types/Order'

import OrderService from '../../services/ordersService'

export const purcharseInit = () : ORDER_ACTION => {
  return {
    type: PURCHASE_INIT
  }
}

export const purchasesBurgerSuccess = (id: string, order: Order) : ORDER_ACTION => {
  return {
    type: PURCHASE_BURGER_SUCCESS,
    payload: {
      orderId: id,
      order
    }
  }
}

export const purchaseBurgerFail = (error: boolean) : ORDER_ACTION => {
  return {
    type: PURCHASE_BURGER_FAIL,
    payload: error
  }
}

export const purchaseBurgerStart = () : ORDER_ACTION => {
  return {
    type: PURCHASE_BURGER_START
  }
}

export const purchaseBurger = (newOrder: Order) : ThunkAction<void, RootState, null, ORDER_ACTION> => {
  return async dispatch => {
    try {
      const order: Order = await OrderService.getInstance().create(newOrder)
      dispatch(purchasesBurgerSuccess(order.id!, order))
    }
    catch {
      dispatch(purchaseBurgerFail(true))
    }
  }
}

export const fetchOrderSuccess = (orders: Array<Order>) : ORDER_ACTION => {
  return {
    type: FETCH_ORDERS_SUCCESS,
    payload: orders
  }
}

export const fetchOrderFail = (error: boolean) : ORDER_ACTION => {
  return {
    type: FETCH_ORDERS_START,
    payload: error
  }
}

export const fetchOrderStart = () => {
  return {
    type: FETCH_ORDERS_START
  }
}

export const fetchOrders = () : ThunkAction<void, RootState, null, ORDER_ACTION> => {
  return async dispatch => {
    try {
      const orders = await OrderService.getInstance().getAll()
      dispatch(fetchOrderSuccess(orders))
    }
    catch {
      dispatch(fetchOrderFail(true))
    }
  }
}