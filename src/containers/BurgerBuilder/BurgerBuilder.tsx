import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { Dispatch } from 'redux'
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
import { addIngredient, removeIngredient } from 'store/actions/burgerActions'

const mapStateToProps = (state: RootState) => {
  return {
    ingrs: state.burger.ingredients,
    tPrice: state.burger.totalPrice
  }
}

const mapDispatchToPros = (dispatch: Dispatch) => ({
  addIngredient: (ingredient: string) => dispatch(addIngredient(ingredient)),
  removeIngredient: (ingredient: string) => dispatch(removeIngredient(ingredient))
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
  hasError: boolean
}

type KeyIngredient = keyof Ingredient

class BurgerBuilder extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    
    this.state = {
      purchasing: false,
      loading: false,
      hasError: false
    }

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
    this.setState({ purchasing: true })
  }

  purchaseCancelHandler() {
    this.setState({ purchasing: false })
  }

  purchaseContinueHandler() {    
    // const queryParams = Object.keys(this.props.ingrs!)
    //                       .map( ingredient => encodeURIComponent( ingredient ) + '=' + encodeURIComponent( this.props.ingrs![ingredient as KeyIngredient] ) )
    // queryParams.push('price=' + this.props.tPrice)
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

    let burger = this.state.hasError ? <p>Ingredients can't be loaded!</p> : <Spinner />
    if (this.props.ingrs) {
      burger = <Aux>
        <Burger ingredients={this.props.ingrs} />
        <BuildControls 
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