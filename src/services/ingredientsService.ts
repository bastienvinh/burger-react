import axios from '../axios-orders'
import Ingredients from '../types/Ingredients'

class IngredientsService {
  private static readonly instance : IngredientsService =  new IngredientsService()

  private authToken = ""
  
  private constructor() {}

  public static getInstance() {
    return IngredientsService.instance
  }

  public clear() : void {
    this.authToken = ""
  }

  public setAuth(auth: string) {
    this.authToken = auth
  }

  public async getAll() : Promise<Ingredients> {
    return axios.get(`/ingredients.json?auth=${this.authToken}`).then(response => response.data)
  }
}

export default IngredientsService