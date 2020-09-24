import Order from 'types/Order'
import '../types/Ingredients'
import Ingredients from '../types/Ingredients'
import { AuthData } from '../types/AllType' 

export const ADD_INGREDIENTS = 'ADD_INGREDIENTS'
export const REMOVE_INGREDIENTS = 'REMOVE_INGREDIENTS'
export const SET_INGREDIENTS = 'INIT_INGREDIENTS'
export const FETCH_INGREDIENTS_FAILED = 'FETCH_INGREDIENT'

export const PURCHASE_BURGER_SUCCESS = 'PURCHASE_BURGER_SUCCESS'
export const PURCHASE_BURGER_FAIL = 'PURCHASE_BURGER_FAIL'
export const PURCHASE_BURGER_START = 'PURCHASE_BURGER_START'
export const PURCHASE_INIT = 'PURCHASE_INIT'

export const FETCH_ORDERS_START = 'FETCH_ORDERS_START'
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS'
export const FETCH_ORDERS_FAIL = 'FETCH_ORDERS_FAIL'

export const AUTH_START = 'AUTH_START'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_FAIL = 'AUTH_FAIL'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'

export interface ADD_ACTION {
  type: typeof ADD_INGREDIENTS
  payload: string
}

export interface REMOVE_ACTION {
  type: typeof REMOVE_INGREDIENTS
  payload: string
}

export interface SET_INGREDIENTS_ACTION {
  type: typeof SET_INGREDIENTS,
  payload: Ingredients
}

export interface FETCH_INGREDIENTS_FAILED_ACTION {
  type: typeof FETCH_INGREDIENTS_FAILED
}

export interface PURCHASE_BURGER_SUCCESS_ACTION {
  type: typeof PURCHASE_BURGER_SUCCESS
  payload: {
    orderId: string,
    order: Order
  }
}


export interface PURCHASE_BURGER_FAIL_ACTION {
  type: typeof PURCHASE_BURGER_FAIL,
  payload: boolean
}

export interface PURCHASE_BURGER_START_ACTION {
  type: typeof PURCHASE_BURGER_START
}

export interface PURCHASE_INIT_ACTION {
  type: typeof PURCHASE_INIT
}

export interface FECTH_ORDER_SUCCESS_ACTION {
  type: typeof FETCH_ORDERS_SUCCESS
  payload: Array<Order>
}

export interface FETCH_ORDERS_FAIL_ACTION {
  type: typeof FETCH_ORDERS_FAIL
  payload: boolean
}

export interface FETCH_ORDERS_START_ACTION {
  type: typeof FETCH_ORDERS_START
}

export interface AUTH_START_ACTION {
  type: typeof AUTH_START
}

export interface AUTH_SUCCESS_ACTION {
  type: typeof AUTH_SUCCESS
  payload: AuthData
}

export interface AUTH_FAIL_ACTION {
  type: typeof AUTH_FAIL
  payload: Error
}

export interface AUTH_LOGOUT_ACTION {
  type: typeof AUTH_LOGOUT
}

export type BURGER_ACTION = REMOVE_ACTION | ADD_ACTION | SET_INGREDIENTS_ACTION | FETCH_INGREDIENTS_FAILED_ACTION
export type ORDER_ACTION = PURCHASE_BURGER_SUCCESS_ACTION | PURCHASE_BURGER_FAIL_ACTION | PURCHASE_BURGER_START_ACTION | PURCHASE_INIT_ACTION | FECTH_ORDER_SUCCESS_ACTION | FETCH_ORDERS_FAIL_ACTION | FETCH_ORDERS_START_ACTION
export type AUTH_ACTION = AUTH_START_ACTION | AUTH_SUCCESS_ACTION | AUTH_FAIL_ACTION | AUTH_LOGOUT_ACTION

export interface BurgerState {
  ingredients: { [ingredientName: string] : number } | null
  totalPrice: number,
  error: boolean
}

export interface OrderState {
  orders: Array<Order>
  loading: boolean
  purchased: boolean
  error: boolean
}

export interface AuthState {
  token: string | null
  userId: string | null
  error: Error | null
  loading: boolean
}