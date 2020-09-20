import axios from '../axios-orders'
import Order from '../types/Order'

class OrdersService {

  private static readonly instance = new OrdersService()

  private constructor() {

  }

  public static getInstance() : OrdersService {
    return OrdersService.instance
  }

  public async getAll() : Promise<Array<Order>> {
    return axios.get('/orders.json').then(response => Object.keys(response.data).map( id => ({ id, ...response.data[id] } )))
  }

  public async create(order: Order) : Promise<Order> {
    return await axios.post('/orders.json', order).then(response => { 
      order.id = response.data.name
      return order
    })
  }
}

export default OrdersService