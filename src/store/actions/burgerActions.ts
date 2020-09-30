// import { ThunkAction } from 'redux-thunk'
// import { RootState } from 'store/store'
import { ADD_INGREDIENTS, BURGER_ACTION, SET_INGREDIENTS, REMOVE_INGREDIENTS, FETCH_INGREDIENTS_FAILED, INIT_INGREDIENTS } from '../types'
import '../../types/Ingredients'
import Ingredients from '../../types/Ingredients'
// import IngredientService from '../../services/ingredientsService'
// import axios from '../../axios-orders'
// import firebase from '../../firebase/config'

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

export const initIngredients = () : BURGER_ACTION => {
  return {
    type: INIT_INGREDIENTS
  }
}