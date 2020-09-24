const axios = require('./create-axios')()

// https://documenter.getpostman.com/view/4554319/S1a63SJM?version=latest#151ba154-9c6e-4eaf-959c-3f14e5d5d614
module.exports = loginToken => axios
  .post('/Login', {
    login_token: loginToken
  })
  .then(({ data }) => data)
