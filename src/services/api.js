import axios from 'axios'

export default axios.create({
  baseURL: 'https://swapi.co/api/',
  headers: {
    'Content-Type': 'application/json',
  }
})