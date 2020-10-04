import React, { FC } from 'react'

import classes from './Order.module.css'


interface IProps {
  ingredients: { [ingredientName: string]: number }
  price: number
}

const Orders : FC<IProps> = props => {
  
  const ingredientsOuput = Object.keys(props.ingredients).map( ig => <span 
                                                                            style={{ textTransform: 'capitalize', display: 'inline-block', margin: '0 8px', border: '1px solid #ccc' }} 
                                                                            key={ig}>{ig} ({props.ingredients[ig]})
                                                                          </span> )

    return <div className={classes.Order}>
      <p>Ingredients: {ingredientsOuput}</p>
      <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
    </div>

}

export default Orders