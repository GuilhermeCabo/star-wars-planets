import axios from 'axios'

export default axios.create({
  baseURL: 'https://swapi.dev/api/',
  headers: {
    'Content-Type': 'application/json',
  }
})