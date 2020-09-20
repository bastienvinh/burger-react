interface Order {
  id?: string
  ingredients: { [ingredientName: string]: number }
  price: number
  orderData: { [key: string]: string }
}

export default Order