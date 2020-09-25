import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { connect } from 'react-redux'

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
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'

const mapStateToProps = (state: RootState) => {
  return {
    ingrs: state.burger.ingredients,
    tPrice: state.burger.totalPrice,
    error: state.burger.error,
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToPros = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  initIngredients: () => dispatch(initIngredients()),
  addIngredient: (ingredient: string) => dispatch(addIngredient(ingredient)),
  removeIngredient: (ingredient: string) => dispatch(removeIngredient(ingredient)),
  onInitPurchase: () => dispatch(purcharseInit()),
  onSetAuthRedirectPath: (path: string) => dispatch(setAuthRedirectPath(path))
})

type Ingredient = {
  salad: number,
  cheese: number,
  meat: number,
  bacon: number
}

type ReduxState = ReturnType<typeof mapStateToProps>
type ReduxFunction = ReturnType<typeof mapDispatchToPros>

interface IProps extends RouteComponentProps, ReduxState, ReduxFunction {}

interface IState {
  purchasing: boolean
  loading: boolean
}

type KeyIngredient = keyof Ingredient

class BurgerBuilder extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    
    this.state = {
      purchasing: false,
      loading: false
    }

  }

  componentDidMount() {
    this.props.initIngredients()
  }

  updatePurchaseState() {
    const sum = Object.keys(this.props.ingrs!)
                  .reduce( (total, ingredientName) => total + this.props.ingrs![ingredientName], 0)
    return sum > 0
  }

  addIngredientHandler(type: string) : void {
    const oldCount = this.props.ingrs![type as KeyIngredient]
    const updatedCounted = oldCount + 1
    if (this.props.ingrs) {
      const updatedIngredients = { ...this.props.ingrs }
  
      updatedIngredients[type as KeyIngredient] = updatedCounted
      this.props.addIngredient(type)
    }
  }

  removeIngredientHandler(type: string) : void {
    const oldCount = this.props.ingrs![type as KeyIngredient]

    if (oldCount <= 0) return

    const updatedCounted = oldCount - 1
    if (this.props.ingrs) {
      const updatedIngredients = {
        ...this.props.ingrs
      }
  
      updatedIngredients[type as KeyIngredient] = updatedCounted
      this.props.removeIngredient(type)
    }
  }

  purchaseHandler () {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true })
    }
    else {
      this.props.onSetAuthRedirectPath('/checkout')
      this.props.history.push('/auth')
    }
  }

  purchaseCancelHandler() {
    this.setState({ purchasing: false })
  }

  purchaseContinueHandler() {
    this.props.onInitPurchase()
    this.props.history.push('/checkout')
  }

  render() {
    const ingredients = this.props.ingrs
    const disabledInfo : { [ingredient: string]: boolean } = {}
    for (let ingredientName in ingredients) {
      disabledInfo[ingredientName] = ingredients[ingredientName as KeyIngredient] <= 0
    }

    let orderSummary = <Spinner />

    if (!this.state.loading && this.props.ingrs) {
      orderSummary = <OrderSummary
        price={this.props.tPrice}
        purchaseContinued={this.purchaseContinueHandler.bind(this)} 
        purchaseCanceled={this.purchaseCancelHandler.bind(this)} 
        ingredients={this.props.ingrs}>
      </OrderSummary>  
    }

    let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />
    if (this.props.ingrs) {
      burger = <Aux>
        <Burger ingredients={this.props.ingrs} />
        <BuildControls 
          isAuth={this.props.isAuthenticated}
          price={this.props.tPrice} 
          disabled={disabledInfo}
          purchasable={this.updatePurchaseState()}
          ordered={this.purchaseHandler.bind(this)}
          ingredientRemoved={this.removeIngredientHandler.bind(this)} 
          ingredientAdded={this.addIngredientHandler.bind(this)} />
      </Aux>
    }

    return <WithErrorHandler axios={axios}>
      <Aux>
        <Modal modalClosed={this.purchaseCancelHandler.bind(this)} show={this.state.purchasing}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    </WithErrorHandler>
  }
}


export default connect(mapStateToProps, mapDispatchToPros)(BurgerBuilder)