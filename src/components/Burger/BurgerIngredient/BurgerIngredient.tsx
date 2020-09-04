import React from 'react'

import classes from './BurgerIngredient.module.css'

interface IProps {
  type: string
}

class BurgerIngredient extends React.Component<IProps> {
  
  render() {
    let ingredient : JSX.Element | null = null

    switch (this.props.type) {
      case 'bread-bottom':
        ingredient = <div className={classes.BreadBottom}></div>
        break
      case 'bread-top':
        ingredient = <div className={classes.BreadTop}>
          <div className={classes.Seed1}></div>
          <div className={classes.Seed2}></div>
        </div>
        break
      case 'meat':
        ingredient = <div className={classes.Meat}></div>
        break
      case 'cheese':
        ingredient = <div className={classes.Cheese}></div>
        break
      case 'bacon':
        ingredient = <div className={classes.Bacon}></div>
        break
      case 'salad':
        ingredient = <div className={classes.Salad}></div>
        break
      default:
        ingredient = null
    }

    return ingredient
  }

}

export default BurgerIngredient