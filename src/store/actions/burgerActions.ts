import { ADD_INGREDIENTS, BURGER_ACTION, REMOVE_INGREDIENTS } from '../types'

export const addIngredient = (ingredient: string) : BURGER_ACTION => {
  return {
    type: ADD_INGREDIENTS,
    payload: ingredient
  }
}

export const removeIngredient = (ingredient: string) : BURGER_ACTION => {
  return {
    type: REMOVE_INGREDIENTS,
    payload: ingredient
  }
}

export default { addIngredient, removeIngredient }