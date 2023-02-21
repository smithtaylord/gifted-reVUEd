import Axios from 'axios'
import { baseURL } from '../env'
export const api = Axios.create({
  baseURL,
  timeout: 8000
})
export const sandboxApi = Axios.create({
  baseURL: 'https://bcw-sandbox.herokuapp.com/',
  timeout: 8000
})

export const giphyApi = Axios.create({
  baseURL: 'http://api.giphy.com/v1/gifs',
  timeout: 8000,
  params: {
    // api_key: 'ReXivBqXr5tO4HjUfTK1W76hhx3S058Q'
  }
})
