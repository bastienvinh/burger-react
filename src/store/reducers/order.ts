import { OrderState, ORDER_ACTION, PURCHASE_BURGER_SUCCESS, PURCHASE_BURGER_FAIL, PURCHASE_BURGER_START, PURCHASE_INIT, FETCH_ORDERS_START, FETCH_ORDERS_SUCCESS, FETCH_ORDERS_FAIL } from '../types'
import { updateObject } from '../utility'

const initiateState : OrderState = {
  orders: [],
  loading: false,
  purchased: false
}

const reducer = (state: OrderState = initiateState, action: ORDER_ACTION) : OrderState => {

  switch (action.type) {
    case PURCHASE_INIT:
      // return { ...state, loading: false, purchased: false }
      return updateObject(state, { loading: false, purchased: false })
    case PURCHASE_BURGER_START:
      // return { ...state, loading: true }
      return updateObject( state, { loading: true } )
    case PURCHASE_BURGER_SUCCESS:
      // return { ...state, loading: false, orders: state.orders.concat(action.payload.order), purchased: true }
      return updateObject(state, { loading: false, orders: state.orders.concat(action.payload.order), purchased: true })
    case PURCHASE_BURGER_FAIL:
      return state
      // return { ...state }
    case FETCH_ORDERS_START:
      // return {
      //   ...state,
      //   loading: true
      // }
      return updateObject(state, { loading: true })
    case FETCH_ORDERS_SUCCESS:
      // return {
      //   ...state,
      //   orders: action.payload,
      //   loading: false
      // }
      return updateObject(state, { orders: action.payload })
    case FETCH_ORDERS_FAIL:
      // return {
      //   ...state,
      //   loading: false
      // }
      return updateObject(state, { loading: false })
    
    default:
      return state
  }

}

export default reducer