import React, { Component } from 'react'

import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from 'components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios-orders'

interface IProps {

}

interface IState {
  ingredients:  {
    [ingredient: string]: number
  },
  totalPrice: number,
  purcharseable: boolean
  purchasing: boolean
  loading: boolean
}

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

type KeyIngredientPrice = keyof typeof INGREDIENT_PRICES

class BurgerBuilder extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    
    this.state = {
      ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
      },
      totalPrice: 0,
      purcharseable: false,
      purchasing: false,
      loading: false
    }

  }

  updatePurchaseState(ingredients: { [ingredientName: string] : number }) {
    const sum = Object.keys(ingredients)
                  .reduce( (total, ingredientName) => total + ingredients[ingredientName], 0)
    this.setState({ purcharseable: sum > 0 })
  }

  addIngredientHandler(type: string) : void {
    const oldCount = this.state.ingredients[type]
    const updatedCounted = oldCount + 1
    const updatedIngredients = {
      ...this.state.ingredients
    }

    updatedIngredients[type] = updatedCounted
    const priceAddition = INGREDIENT_PRICES[type as KeyIngredientPrice]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice + priceAddition

    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice })
    this.updatePurchaseState(updatedIngredients)
  }

  removeIngredientHandler(type: string) : void {
    const oldCount = this.state.ingredients[type]

    if (oldCount <= 0) return

    const updatedCounted = oldCount - 1
    const updatedIngredients = {
      ...this.state.ingredients
    }

    updatedIngredients[type] = updatedCounted
    const priceDeduction = INGREDIENT_PRICES[type as KeyIngredientPrice]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice - priceDeduction

    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice })
    this.updatePurchaseState(updatedIngredients)
  }

  purchaseHandler () {
    this.setState({ purchasing: true })
  }

  purchaseCancelHandler() {
    this.setState({ purchasing: false })
  }

  purchaseContinueHandler() {
    // alert('You continue!')
    this.setState({ loading: true })
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Bastien NOLO',
        address:  {
          street: 'Teststreet 1',
          zipCode: '41351',
          country: 'Germany'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then(response => console.log(response))
      .finally(() => this.setState({ loading: false, purchasing: false }))
  }

  render() {
    const ingredients = this.state.ingredients
    const disabledInfo : { [ingredient: string]: boolean } = {}
    for (let ingredientName in ingredients) {
      disabledInfo[ingredientName] = ingredients[ingredientName] <= 0
    }

    let orderSummary = <OrderSummary
      price={this.state.totalPrice}
      purchaseContinued={this.purchaseContinueHandler.bind(this)} 
      purchaseCanceled={this.purchaseCancelHandler.bind(this)} 
      ingredients={this.state.ingredients}>
    </OrderSummary>
    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    return <Aux>
      <Modal modalClosed={this.purchaseCancelHandler.bind(this)} show={this.state.purchasing}>
        {orderSummary}
      </Modal>
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
}


export default BurgerBuilder