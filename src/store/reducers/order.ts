import { OrderState, ORDER_ACTION, PURCHASE_BURGER_SUCCESS, PURCHASE_BURGER_FAIL, PURCHASE_BURGER_START, PURCHASE_INIT, FETCH_ORDERS_START, FETCH_ORDERS_SUCCESS, FETCH_ORDERS_FAIL } from '../types'
import { updateObject } from '../../shared/utility'

const initiateState : OrderState = {
  orders: [],
  loading: false,
  purchased: false,
  error: false
}

const reducer = (state: OrderState = initiateState, action: ORDER_ACTION) : OrderState => {

  switch (action.type) {
    case PURCHASE_INIT:
      return updateObject(state, { loading: false, purchased: false, error: false })
    case PURCHASE_BURGER_START:
      return updateObject( state, { loading: true } )
    case PURCHASE_BURGER_SUCCESS:
      return updateObject(state, { loading: false, error: false, orders: state.orders.concat(action.payload.order), purchased: true })
    case PURCHASE_BURGER_FAIL:
      return updateObject(state, { error: true, loading: false })
    case FETCH_ORDERS_START:
      return updateObject(state, { loading: true })
    case FETCH_ORDERS_SUCCESS:
      return updateObject(state, { orders: action.payload, loading: false })
    case FETCH_ORDERS_FAIL:
      return updateObject(state, { loading: false })
    
    default:
      return state
  }

}

export default reducer