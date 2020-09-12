import React, { Component } from 'react'

import classes from './Order.module.css'
import IIngredients from '../../types/Ingredients'

type KeyOfIIngredient = keyof IIngredients

interface IProps {
  ingredients: IIngredients
  price: number
}

interface IState {

}

class Orders extends Component<IProps, IState> {
  
  render() {

  const ingredientsOuput = Object.keys(this.props.ingredients).map( ig => <span 
                                                                            style={{ textTransform: 'capitalize', display: 'inline-block', margin: '0 8px', border: '1px solid #ccc' }} 
                                                                            key={ig}>{ig} ({this.props.ingredients[ig as KeyOfIIngredient]})
                                                                          </span> )

    return <div className={classes.Order}>
      <p>Ingredients: {ingredientsOuput}</p>
      <p>Price: <strong>USD {this.props.price.toFixed(2)}</strong></p>
    </div>
  }

}

export default Orders