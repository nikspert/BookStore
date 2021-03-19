import axios from 'axios'
import config from '../config'
export const getDetails = (id) => {
  const options = {
    method: 'GET',
    url: config.apiBooks + id,
  }
  return axios
    .request(options)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return error
    })
}
export const getNewBooks = () => {
  console.log('fetching')
  const options = {
    method: 'GET',
    url: config.apiNew,
  }
  return axios
    .request(options)
    .then((response) => response.data.books)
    .catch((error) => {
      return error
    })
}
export const getBooksByTitle = (title) => {
  const options = {
    method: 'GET',
    url: config.apiSearch + title,
  }
  return axios
    .request(options)
    .then((response) => response.data.books)
    .catch((error) => {
      return error
    })
}
