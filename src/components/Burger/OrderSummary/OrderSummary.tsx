import React, { Component } from 'react'
import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button'

interface IProps {
  price: number
  ingredients: { [ingredientName: string]: number }
  purchaseCanceled: () => void
  purchaseContinued: () => void
}

class OrderSummary extends Component<IProps> {

  componentWillUpdate() {
    console.log('[OrderSummary] WillUpdate')
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
                              .map(ingredientName => <li><span style={{ textTransform: 'capitalize' }}>{ingredientName}</span> : {this.props.ingredients[ingredientName]}</li>)
  
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