import { createStore, combineReducers, applyMiddleware } from 'redux'
import burgerReducer from './reducers/burgerReducer'
import orderReducer from './reducers/order'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const reducers = combineReducers({
  burger: burgerReducer,
  orders: orderReducer
})

export type RootState = ReturnType<typeof reducers>

const store = createStore(reducers, composeWithDevTools(applyMiddleware( thunk )))

export default store