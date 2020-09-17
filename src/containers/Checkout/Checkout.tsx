import React, { Component } from "react"
import { RouteComponentProps, Route } from 'react-router-dom'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import { connect } from 'react-redux'
import { RootState } from "store/store"

const mapStateToProps = (state: RootState) => ({
  ingredients: state.burger.ingredients,
  totalPrice: state.burger.totalPrice
})

type ReduxState = ReturnType<typeof mapStateToProps>

interface IProps extends RouteComponentProps, ReduxState {}
interface IState {}

class Checkout extends Component<IProps, IState> {

  checkoutCancelledHandler() {
    this.props.history.goBack()
  }

  checkoutContinuedHandler() {
    this.props.history.replace('/checkout/contact-data')
  }

  render() {
    return <div>
      <CheckoutSummary checkoutCancelled={this.checkoutCancelledHandler.bind(this)} checkoutContinued={this.checkoutContinuedHandler.bind(this)} ingredients={this.props.ingredients!} />
      <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
    </div>
  }
}


export default connect(mapStateToProps)(Checkout)