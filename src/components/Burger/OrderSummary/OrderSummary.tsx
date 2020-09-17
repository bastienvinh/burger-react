import React, { Component } from 'react'
import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button'

type Ingredient = {
  salad: number,
  cheese: number,
  meat: number,
  bacon: number
}

interface IProps {
  price: number
  ingredients: { [ingredient: string]: number }
  purchaseCanceled: () => void
  purchaseContinued: () => void
}

type keyIngredient = keyof Ingredient

class OrderSummary extends Component<IProps> {

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
                              .map(ingredientName => <li key={ingredientName + "_" + Math.random()}><span style={{ textTransform: 'capitalize' }}>{ingredientName}</span> : {this.props.ingredients[ingredientName as keyIngredient]}</li>)
  
    return <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients :</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Total Price : {this.props.price.toFixed(2)}</strong></p>
      <p>Continue to checkout ?</p>
      <Button btnType="Danger" clicked={this.props.purchaseCanceled} >CANCEL</Button>
      <Button btnType="Success" clicked={this.props.purchaseContinued} >CONTINUE</Button>
    </Aux>
  }
  
}

export default OrderSummary