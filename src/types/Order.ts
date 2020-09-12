import Ingredients from './Ingredients'

interface Order {
  id: string
  customer: {
    address: {
      street: string
      postalCode: string
      country: string
    }
    name: string
    email: string
  }
  deliveryMethod: string
  price: number
  ingredients: Ingredients
}

export default Order