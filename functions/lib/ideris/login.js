const axios = require('./create-axios')()

// https://documenter.getpostman.com/view/4554319/S1a63SJM?version=latest#151ba154-9c6e-4eaf-959c-3f14e5d5d614
module.exports = loginToken => new Promise((resolve, reject) => {
  const request = isRetry => {
    axios.post('/Login', {
      login_token: loginToken
    })
      .then(({ data }) => resolve(data))
      .catch(err => {
        if (!isRetry && err.response && err.response.status >= 429) {
          setTimeout(() => request(true), 7000)
        }
        reject(err)
      })
  }
  request()
})
