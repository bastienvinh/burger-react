import React, { FC } from 'react'
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

const OrderSummary: FC<IProps> = props => {

  const ingredientSummary = Object.keys(props.ingredients)
    .map(ingredientName => <li key={ingredientName + "_" + Math.random()}><span style={{ textTransform: 'capitalize' }}>{ingredientName}</span> : {props.ingredients[ingredientName as keyIngredient]}</li>)

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