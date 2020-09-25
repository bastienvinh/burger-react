import { ADD_INGREDIENTS, REMOVE_INGREDIENTS, BurgerState, BURGER_ACTION, SET_INGREDIENTS, FETCH_INGREDIENTS_FAILED } from '../types'
import { updateObject }  from '../utility'

const initialState: BurgerState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  totalPrice: 4,
  error: false,
  building: false
}

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

type KeyIngredientPrice = keyof typeof INGREDIENT_PRICES

const reducer = (state: BurgerState = initialState, action: BURGER_ACTION) : BurgerState => {
  switch (action.type) {
    case ADD_INGREDIENTS:

      const ingredientsAddIngredient = {
        ...state.ingredients,
        [action.payload] : state.ingredients![action.payload] + 1
      }

      const totalPriceAddIngredient = state.totalPrice + INGREDIENT_PRICES[action.payload as KeyIngredientPrice]

      return updateObject(state, { ingredients: ingredientsAddIngredient, totalPrice: totalPriceAddIngredient , building: true })
    case REMOVE_INGREDIENTS:
      const ingredientsRemoveIngredients = {
        ...state.ingredients,
        [action.payload]: state.ingredients![action.payload] - 1
      }

      const totalPriceRemoveIngredients = state.totalPrice - INGREDIENT_PRICES[action.payload as KeyIngredientPrice]

      return updateObject(state, { ingredients: ingredientsRemoveIngredients, totalPrice: totalPriceRemoveIngredients, building: true })
    case SET_INGREDIENTS:
      return updateObject(state, { ingredients: action.payload, totalPrice: 4, error: false })
    case FETCH_INGREDIENTS_FAILED:
      return updateObject(state, { error: true })
    default:
      return state
  }
}

export default reducer 