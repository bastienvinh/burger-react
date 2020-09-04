import React, { FunctionComponent } from 'react'

import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

interface IProps {
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

export default Burger