import React, { Component } from 'react'

import Order from '../../components/Order/Order'
import IOrder from '../../types/Order'
import axios from '../../axios-orders'


import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'

interface IProps {

}

interface IState {
  orders: Array<IOrder>
  loading: boolean
}

class Orders extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      orders: [],
      loading: true
    }
  }

  async componentDidMount() {
    const ordersDictionnary = await axios.get('/orders.json').then(response => response.data)
    const orders = Object.keys(ordersDictionnary).map( key => ({  ...ordersDictionnary[key], id: key }) )
    this.setState({ loading: false, orders })
  }

  render() {
    const orders = this.state.orders.map(order => <Order key={order.id} ingredients={order.ingredients} price={order.price} />)

    return <WithErrorHandler axios={axios}>
      <div>
        {orders}
      </div>
    </WithErrorHandler>
  }
}

export default Orders