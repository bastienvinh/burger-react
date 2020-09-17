export const ADD_INGREDIENTS = 'ADD_INGREDIENTS'
export const REMOVE_INGREDIENTS = 'REMOVE_INGREDIENTS'

export interface ADD_ACTION {
  type: typeof ADD_INGREDIENTS
  payload: string
}

export interface REMOVE_ACTION {
  type: typeof REMOVE_INGREDIENTS
  payload: string
}

export type BURGER_ACTION = REMOVE_ACTION | ADD_ACTION

export interface BurgerState {
  ingredients: { [ingredientName: string] : number } | null
  totalPrice: number
}

export default { ADD_INGREDIENTS, REMOVE_INGREDIENTS }