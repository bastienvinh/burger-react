import React, { Component } from "react"
import { RouteComponentProps, Route } from 'react-router-dom'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

interface IProps extends RouteComponentProps {

}

interface IState {
  ingredients: { [ingredient: string] : number }
  totalPrice: number
}

// const ingredients: { [ingredient: string]: number } = {
//   salad: 1,
//   cheese: 1,
//   meat: 1,
//   bacon: 1
// }

class Checkout extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props)

    this.state = {
      ingredients: {
        salad: 1,
        cheese: 1,
        meat: 1,
        bacon: 1
      },
      totalPrice: 0
    }
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search)
    const ingredients: { [ingredient: string]: number } = {}
    let price = 0
    for (let param of query.entries()) {

      if (param[0] === 'price') {
        price = +param[1]
        continue
      }

      ingredients[param[0]] = +param[1]
    }
    this.setState({ ingredients, totalPrice: price })
  }

  checkoutCancelledHandler() {
    this.props.history.goBack()
  }

  checkoutContinuedHandler() {
    this.props.history.replace('/checkout/contact-data')
  }

  render() {
    return <div>
      <CheckoutSummary checkoutCancelled={this.checkoutCancelledHandler.bind(this)} checkoutContinued={this.checkoutContinuedHandler.bind(this)} ingredients={this.state.ingredients} />
      <Route path={this.props.match.path + '/contact-data'} render={props => <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />} />
    </div>
  }
}


export default Checkout