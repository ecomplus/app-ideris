const axios = require('axios')

// https://documenter.getpostman.com/view/4554319/S1a63SJM
module.exports = accessToken => {
  const headers = {
    'Content-Type': 'application/json'
  }
  if (accessToken) {
    headers.Authorization = accessToken
  }
  return axios.create({
    baseURL: 'http://api.ideris.com.br/',
    headers
  })
}
