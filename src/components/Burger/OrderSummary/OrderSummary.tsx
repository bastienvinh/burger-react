import React, { FunctionComponent } from 'react'
import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button/Button'

interface IProps {
  price: number
  ingredients: { [ingredientName: string]: number }
  purchaseCanceled: () => void
  purchaseContinued: () => void
}

const OrderSummary : FunctionComponent<IProps>  = props => {
  const ingredientSummary = Object.keys(props.ingredients)
                              .map(ingredientName => <li><span style={{ textTransform: 'capitalize' }}>{ingredientName}</span> : {props.ingredients[ingredientName]}</li>)
  
  return <Aux>
    <h3>Your Order</h3>
    <p>A delicious burger with the following ingredients :</p>
    <ul>
      {ingredientSummary}
    </ul>
    <p><strong>Total Price : {props.price.toFixed(2)}</strong></p>
    <p>Continue to checkout ?</p>
    <Button btnType="Danger" clicked={props.purchaseCanceled} >CANCEL</Button>
    <Button btnType="Success" clicked={props.purchaseContinued} >CONTINUE</Button>
  </Aux>
}

export default OrderSummary