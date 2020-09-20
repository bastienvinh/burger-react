import React, { Component } from 'react'
import axios from '../../axios-orders'
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'
import { fetchOrders } from 'store/actions/order'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { connect } from 'react-redux'
import { RootState } from 'store/store'
import Order from '../../components/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner'

const mapStateToProps = (state: RootState) => ({
  orders: state.orders.orders,
  loading: state.orders.loading
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  onFetchOrders : () => dispatch(fetchOrders())
})

type ReduxMatch = ReturnType<typeof mapStateToProps>
type ReduxDispatch = ReturnType<typeof mapDispatchToProps>

interface IProps extends ReduxDispatch, ReduxMatch {}

interface IState {
}

class Orders extends Component<IProps, IState> {

  async componentDidMount() {
    this.props.onFetchOrders()
  }

  render() {
    // const orders= null
    let orders: React.ReactNode = <Spinner />

    if (!this.props.loading && this.props.orders) {
      orders = this.props.orders.map(order => <Order key={order.id} ingredients={order.ingredients} price={order.price} />)
    }

    return <WithErrorHandler axios={axios}>
      <div>
        {orders}
      </div>
    </WithErrorHandler>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)