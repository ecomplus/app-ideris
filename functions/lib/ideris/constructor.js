const createAxios = require('./create-axios')
const login = require('./login')

module.exports = function (loginToken, firestoreColl = 'ideris_tokens') {
  const self = this

  let documentRef
  if (firestoreColl) {
    documentRef = require('firebase-admin')
      .firestore()
      .doc(`${firestoreColl}/${loginToken}`)
  }

  this.preparing = new Promise((resolve, reject) => {
    const authenticate = accessToken => {
      self.axios = createAxios(accessToken)
      resolve(self)
    }

    const handleLogin = () => {
      console.log('> Ideris login')
      login(loginToken)
        .then(accessToken => {
          console.log(`> New Ideris token ${accessToken}`)
          authenticate(accessToken)
          if (documentRef) {
            documentRef.set({ accessToken }).catch(console.error)
          }
        })
        .catch(reject)
    }

    if (documentRef) {
      documentRef.get()
        .then((documentSnapshot) => {
          if (
            documentSnapshot.exists &&
            Date.now() - documentSnapshot.updateTime.toDate().getTime() <= 18 * 60 * 60 * 1000
          ) {
            authenticate(documentSnapshot.get('accessToken'))
          } else {
            handleLogin()
          }
        })
        .catch(console.error)
    } else {
      handleLogin()
    }
  })
}
