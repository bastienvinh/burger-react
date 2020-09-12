import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from 'components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios-orders'
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'

type Ingredient = {
  salad: number,
  cheese: number,
  meat: number,
  bacon: number
}

interface IProps extends RouteComponentProps {

}

interface IState {
  ingredients: Ingredient | undefined,
  totalPrice: number,
  purcharseable: boolean
  purchasing: boolean
  loading: boolean
  hasError: boolean
}

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

type KeyIngredientPrice = keyof typeof INGREDIENT_PRICES
type KeyIngredient = keyof Ingredient

class BurgerBuilder extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    
    this.state = {
      ingredients: undefined,
      totalPrice: 4,
      purcharseable: false,
      purchasing: false,
      loading: false,
      hasError: false
    }

  }

  updatePurchaseState(ingredients: { [ingredientName: string] : number }) {
    const sum = Object.keys(ingredients)
                  .reduce( (total, ingredientName) => total + ingredients[ingredientName], 0)
    this.setState({ purcharseable: sum > 0 })
  }

  addIngredientHandler(type: string) : void {
    const oldCount = this.state.ingredients![type as KeyIngredient]
    const updatedCounted = oldCount + 1
    if (this.state.ingredients) {
      const updatedIngredients: Ingredient = { ...this.state.ingredients }
  
      updatedIngredients[type as KeyIngredient] = updatedCounted
      const priceAddition = INGREDIENT_PRICES[type as KeyIngredientPrice]
      const oldPrice = this.state.totalPrice
      const newPrice = oldPrice + priceAddition
  
      this.setState({ ingredients: updatedIngredients, totalPrice: newPrice })
      this.updatePurchaseState(updatedIngredients)
    }
  }

  removeIngredientHandler(type: string) : void {
    const oldCount = this.state.ingredients![type as KeyIngredient]

    if (oldCount <= 0) return

    const updatedCounted = oldCount - 1
    if (this.state.ingredients) {
      const updatedIngredients = {
        ...this.state.ingredients
      }
  
      updatedIngredients[type as KeyIngredient] = updatedCounted
      const priceDeduction = INGREDIENT_PRICES[type as KeyIngredientPrice]
      const oldPrice = this.state.totalPrice
      const newPrice = oldPrice - priceDeduction
  
      this.setState({ ingredients: updatedIngredients, totalPrice: newPrice })
      this.updatePurchaseState(updatedIngredients)
    }
  }

  purchaseHandler () {
    this.setState({ purchasing: true })
  }

  purchaseCancelHandler() {
    this.setState({ purchasing: false })
  }

  purchaseContinueHandler() {    
    const queryParams = Object.keys(this.state.ingredients!)
                          .map( ingredient => encodeURIComponent( ingredient ) + '=' + encodeURIComponent( this.state.ingredients![ingredient as KeyIngredient] ) )
    queryParams.push('price=' + this.state.totalPrice)
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryParams.join('&')
    })
  }

  async componentDidMount() {
    try {
      const { data } = await axios.get('https://react-my-burger-5965d.firebaseio.com/ingredients.json')
      this.setState( { ingredients: data } )
    }
    catch {
      console.log('You error has been seeen ...')
      this.setState({ hasError: true })
    }
  }

  render() {
    const ingredients = this.state.ingredients
    const disabledInfo : { [ingredient: string]: boolean } = {}
    for (let ingredientName in ingredients) {
      disabledInfo[ingredientName] = ingredients[ingredientName as KeyIngredient] <= 0
    }

    let orderSummary = <Spinner />

    if (!this.state.loading && this.state.ingredients) {
      orderSummary = <OrderSummary
        price={this.state.totalPrice}
        purchaseContinued={this.purchaseContinueHandler.bind(this)} 
        purchaseCanceled={this.purchaseCancelHandler.bind(this)} 
        ingredients={this.state.ingredients}>
      </OrderSummary>  
    }

    let burger = this.state.hasError ? <p>Ingredients can't be loaded!</p> : <Spinner />
    if (this.state.ingredients) {
      burger = <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls 
          price={this.state.totalPrice} 
          disabled={disabledInfo}
          purchasable={this.state.purcharseable}
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


export default BurgerBuilder