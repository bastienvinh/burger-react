import axios from '../axios-orders'
import Order from '../types/Order'

class OrdersService {

  private static readonly instance = new OrdersService()
  private authToken = ""
  private userId = ""

  private constructor() {

  }

  public static getInstance() : OrdersService {
    return OrdersService.instance
  }

  public async clear() {
    this.authToken = ""
    this.userId = ""
  }

  public setAuth(auth: string) {
    this.authToken = auth
  }

  public setUserId(userId: string) {
    this.userId = userId
  }

  public async getAll() : Promise<Array<Order>> {
    // '&orderBY="userId"&equalTo="' + this.userId + '"' // for some its not working
    const queryParams = '?auth=' + this.authToken
    return axios.get(`/orders.json${queryParams}`)
      .then(response => Object.keys(response.data).map( id => ({ id, ...response.data[id] } )))
  }

  public async create(order: Order) : Promise<Order> {
    return await axios.post(`/orders.json?auth=${this.authToken}`, order).then(response => { 
      order.id = response.data.name
      return order
    })
  }
}

export default OrdersService