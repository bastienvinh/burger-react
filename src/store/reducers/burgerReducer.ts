import { ADD_INGREDIENTS, REMOVE_INGREDIENTS, BurgerState, BURGER_ACTION } from '../types'

const initialState: BurgerState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  totalPrice: 4
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
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload] : state.ingredients![action.payload] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload as KeyIngredientPrice]
      }
    case REMOVE_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload]: state.ingredients![action.payload] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload as KeyIngredientPrice]
      }
    default:
      return state
  }
}

export default reducer