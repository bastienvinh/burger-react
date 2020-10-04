import React, { FC, useCallback, useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { connect, useDispatch, useSelector } from 'react-redux'

import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from 'components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios-orders'
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'

import { RootState } from 'store/store'
import { addIngredient, initIngredients, removeIngredient } from 'store/actions/burgerActions'
import { setAuthRedirectPath } from 'store/actions/auth'
import { purcharseInit } from 'store/actions/order'

type Ingredient = {
  salad: number,
  cheese: number,
  meat: number,
  bacon: number
}

interface IProps extends RouteComponentProps {}

type KeyIngredient = keyof Ingredient

const BurgerBuilder: FC<IProps> = props => {

  const dispatch = useDispatch()
  const ings = useSelector((state: RootState) => state.burger.ingredients)
  const tPrice = useSelector((state: RootState) => state.burger.totalPrice)
  const error = useSelector((state: RootState) => state.burger.error)
  const isAuthenticated = useSelector((state: RootState) => state.auth.token !== null)

  const onAddIngredient = (ingredient: string) => dispatch(addIngredient(ingredient))
  const onRemoveIngredient = (ingredient: string) => dispatch(removeIngredient(ingredient))
  const onInitPurchase = () => dispatch(purcharseInit())
  const onSetAuthRedirectPath = (path: string) => dispatch(setAuthRedirectPath(path))
  const onInitIngredients = useCallback(() => dispatch(initIngredients()), [dispatch])

  const [purchasing, setPurchasing] = useState(false)
  const [loading] = useState(false)

  useEffect(() => {
    onInitIngredients()
  }, [onInitIngredients])

  const updatePurchaseState = () => {
    const sum = Object.keys(ings!)
                  .reduce( (total, ingredientName) => total + ings![ingredientName], 0)
    return sum > 0
  }

  const addIngredientHandler = (type: string) : void => {
    const oldCount = ings![type as KeyIngredient]
    const updatedCounted = oldCount + 1
    if (ings) {
      const updatedIngredients = { ...ings }
  
      updatedIngredients[type as KeyIngredient] = updatedCounted
      onAddIngredient(type)
    }
  }

  const removeIngredientHandler = (type: string) : void => {
    const oldCount = ings![type as KeyIngredient]

    if (oldCount <= 0) return

    const updatedCounted = oldCount - 1
    if (ings) {
      const updatedIngredients = {
        ...ings
      }
  
      updatedIngredients[type as KeyIngredient] = updatedCounted
      onRemoveIngredient(type)
    }
  }

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true)
    }
    else {
      onSetAuthRedirectPath('/checkout')
      props.history.push('/auth')
    }
  }

  const purchaseCancelHandler = () => {
    setPurchasing(false)
  }

  const purchaseContinueHandler = () => {
    onInitPurchase()
    props.history.push('/checkout')
  }

    const ingredients = ings
    const disabledInfo : { [ingredient: string]: boolean } = {}
    for (let ingredientName in ingredients) {
      disabledInfo[ingredientName] = ingredients[ingredientName as KeyIngredient] <= 0
    }

    let orderSummary = <Spinner />

    if (!loading && ings) {
      orderSummary = <OrderSummary
        price={tPrice}
        purchaseContinued={purchaseContinueHandler} 
        purchaseCanceled={purchaseCancelHandler} 
        ingredients={ings}>
      </OrderSummary>  
    }

    let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner />
    if (ings) {
      burger = <Aux>
        <Burger ingredients={ings} />
        <BuildControls 
          isAuth={isAuthenticated}
          price={tPrice} 
          disabled={disabledInfo}
          purchasable={updatePurchaseState()}
          ordered={purchaseHandler}
          ingredientRemoved={removeIngredientHandler} 
          ingredientAdded={addIngredientHandler} />
      </Aux>
    }

    return <WithErrorHandler axios={axios}>
      <Aux>
        <Modal modalClosed={purchaseCancelHandler} show={purchasing}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    </WithErrorHandler>
}


export default connect()(BurgerBuilder)