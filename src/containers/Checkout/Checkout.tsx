import React, { Component } from "react"
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

// const mapDispatchtoProps = (dispacth: ThunkDispatch<any, any, AnyAction>) => ({
//   onInitPurchase: () => dispacth(purcharsInit())
// })

type ReduxState = ReturnType<typeof mapStateToProps>
// type ReduxDispacth = ReturnType<typeof mapDispatchtoProps>

interface IProps extends RouteComponentProps, ReduxState {}
interface IState {}

class Checkout extends Component<IProps, IState> {

  componentDidMount() {
    // console.log(this.props.onInitPurchase)
    // this.props.onInitPurchase()
  }

  checkoutCancelledHandler() {
    this.props.history.goBack()
  }

  checkoutContinuedHandler() {
    this.props.history.replace('/checkout/contact-data')
  }

  render() {
    let summary = <Redirect to="/" />
    if (this.props.ingredients) {

      const purchasedRedirect = this.props.purcharsed ? <Redirect to="/" /> : null

      summary = <div>
        {purchasedRedirect}
        <CheckoutSummary 
          checkoutCancelled={this.checkoutCancelledHandler.bind(this)} 
          checkoutContinued={this.checkoutContinuedHandler.bind(this)} 
          ingredients={this.props.ingredients!} />
        <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
      </div>
    }

    return summary
  }
}


export default connect(mapStateToProps)(Checkout)