import { createStore, combineReducers, applyMiddleware } from 'redux'
import burgerReducer from './reducers/burgerReducer'
import orderReducer from './reducers/order'
import authReducer from './reducers/auth'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import createSagaMiddleWare from 'redux-saga'

import { watchAuth, watchBurgerBuilder, watchOrder } from './sagas'

const reducers = combineReducers({
  burger: burgerReducer,
  orders: orderReducer,
  auth: authReducer
})

const sagaMiddleware = createSagaMiddleWare()

export type RootState = ReturnType<typeof reducers>
const composeEnchancers = composeWithDevTools({ trace: true, traceLimit: 25 })

const store = createStore(reducers, composeEnchancers(applyMiddleware( thunk , sagaMiddleware)))
sagaMiddleware.run(watchAuth)
sagaMiddleware.run(watchBurgerBuilder)
sagaMiddleware.run(watchOrder)

export default store