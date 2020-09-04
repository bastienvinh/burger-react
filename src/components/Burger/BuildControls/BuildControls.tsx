import React, { FunctionComponent } from 'react'
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
]

interface IProps {
  price: number
  purchasable: boolean
  ingredientAdded: (type: string) => void
  ingredientRemoved: (type: string) => void
  disabled: { [key: string]: boolean },
  ordered: () => void
}

const BuildControls: FunctionComponent<IProps> = props => <div className={classes.BuildControls}>

<p>Current Price : <strong>{props.price.toFixed(2)}</strong></p>
  {controls.map(ctrl => <BuildControl
                          disabled={props.disabled[ctrl.type]}
                          type={ctrl.type}
                          key={ctrl.label} 
                          label={ctrl.label}
                          removed={() => props.ingredientRemoved(ctrl.type)}
                          added={() => props.ingredientAdded(ctrl.type)} />)}
  <button onClick={props.ordered} className={classes.OrderButton} disabled={!props.purchasable}>ORDER NOW</button>
</div>

export default BuildControls