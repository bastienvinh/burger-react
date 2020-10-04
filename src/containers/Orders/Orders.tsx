import React, { Dispatch, FC, useEffect } from 'react'
import axios from '../../axios-orders'
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'
import { fetchOrders } from 'store/actions/order'
import { connect } from 'react-redux'
import { RootState } from 'store/store'
import Order from '../../components/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner'
import { ORDER_ACTION } from 'store/types'

const mapStateToProps = (state: RootState) => ({
  orders: state.orders.orders,
  loading: state.orders.loading
})

const mapDispatchToProps = (dispatch: Dispatch<ORDER_ACTION>) => ({
  onFetchOrders: () => dispatch(fetchOrders())
})

type ReduxMatch = ReturnType<typeof mapStateToProps>
type ReduxDispatch = ReturnType<typeof mapDispatchToProps>

interface IProps extends ReduxDispatch, ReduxMatch { }

const Orders: FC<IProps> = props => {

  const { onFetchOrders } = props

  useEffect(() => {
    onFetchOrders()
  }, [onFetchOrders])

  // const orders= null
  let orders: React.ReactNode = <Spinner />

  if (!props.loading && props.orders) {
    orders = props.orders.map(order => <Order key={order.id} ingredients={order.ingredients} price={order.price} />)
  }

  return <WithErrorHandler axios={axios}>
    <div>
      {orders}
    </div>
  </WithErrorHandler>

}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)