const axios = require('axios')

// https://documenter.getpostman.com/view/4554319/S1a63SJM
module.exports = accessToken => axios.create({
  baseURL: 'http://api.ideris.com.br/',
  headers: {
    Authorization: accessToken,
    'Content-Type': 'application/json'
  }
})
