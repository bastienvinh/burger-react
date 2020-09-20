import { ThunkAction } from 'redux-thunk'
import { RootState } from 'store/store'
import { ADD_INGREDIENTS, BURGER_ACTION, SET_INGREDIENTS, REMOVE_INGREDIENTS, FETCH_INGREDIENTS_FAILED } from '../types'
import '../../types/Ingredients'
import Ingredients from '../../types/Ingredients'
import axios from '../../axios-orders'

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

export const setIngredients = (ingredients: Ingredients) : BURGER_ACTION => {
  return {
    type: SET_INGREDIENTS,
    payload: ingredients
  }
}

export const fetchingIngredientsFailed = () : BURGER_ACTION => {
  return {
    type: FETCH_INGREDIENTS_FAILED
  }
}

export const initIngredients = () : ThunkAction<void, RootState, null, BURGER_ACTION> => {
  return async dispatch => {
    try {
      const ingredients = await axios.get('https://react-my-burger-5965d.firebaseio.com/ingredients.json').then(response => response.data)
      dispatch(setIngredients(ingredients))
    }
    catch {
      dispatch(fetchingIngredientsFailed())
    }
  }
}