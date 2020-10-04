import React, { FC } from "react"
import { RouteComponentProps, Route, Redirect } from 'react-router-dom'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import { connect } from 'react-redux'
import { RootState } from "store/store"

const mapStateToProps = (state: RootState) => ({
  ingredients: state.burger.ingredients,
  totalPrice: state.burger.totalPrice,
  purcharsed: state.orders.purchased
})

type ReduxState = ReturnType<typeof mapStateToProps>

interface IProps extends RouteComponentProps, ReduxState {}

const Checkout : FC<IProps> = props => {

  const checkoutCancelledHandler = () => {
    props.history.goBack()
  }

  const checkoutContinuedHandler = () => {
    props.history.replace('/checkout/contact-data')
  }

    let summary = <Redirect to="/" />
    if (props.ingredients) {

      const purchasedRedirect = props.purcharsed ? <Redirect to="/" /> : null

      summary = <div>
        {purchasedRedirect}
        <CheckoutSummary 
          checkoutCancelled={checkoutCancelledHandler} 
          checkoutContinued={checkoutContinuedHandler} 
          ingredients={props.ingredients!} />
        <Route path={props.match.path + '/contact-data'} component={ContactData} />
      </div>
    }

    return summary
}


export default connect(mapStateToProps)(Checkout)