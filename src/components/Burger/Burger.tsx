import React, { FunctionComponent, Props } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

interface IProps extends RouteComponentProps<any>, Props<any> {
  ingredients: { [ingredient: string]: number }
}

const Burger: FunctionComponent<IProps> = props => {
  
  const transformedIngredients = Object.keys(props.ingredients)
    .flatMap(
      ingredientName => [...Array(props.ingredients[ingredientName])].map((_, i) => <BurgerIngredient key={ingredientName + i} type={ingredientName} />)
    )

  return <div className={classes.Burger}>
    <BurgerIngredient type="bread-top" />
    {transformedIngredients}
    <BurgerIngredient type="bread-bottom" />
  </div>
}

export default withRouter(Burger)