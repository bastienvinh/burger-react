import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://react-my-burger-5965d.firebaseio.com'
})

export default instance

