import { createStore, combineReducers } from 'redux'
import burgerReducer from './reducers/burgerReducer'

const reducers = combineReducers({
  burger: burgerReducer
})

export type RootState = ReturnType<typeof reducers>

const store = createStore(reducers)

export default store