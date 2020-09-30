import { put } from 'redux-saga/effects' 

import { setIngredients, fetchingIngredientsFailed } from '../actions/burgerActions'
import IngredientService from '../../services/ingredientsService'

export function* initIngredientsSaga(_action: any) {
  try {
    const ingredients = yield IngredientService.getInstance().getAll()
    
    // dispatch(setIngredients({}))
    yield put(setIngredients(ingredients))
  }
  catch {
    yield put(fetchingIngredientsFailed())
  }
}