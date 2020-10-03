const getAppData = require('./../../lib/store-api/get-app-data')
const updateAppData = require('../store-api/update-app-data')

const queueRetry = (appSession, { action, queue, nextId }, appData, response) => {
  const retryKey = `${appSession.storeId}_${action}_${queue}_${nextId}`
  const documentRef = require('firebase-admin')
    .firestore()
    .doc(`integration_retries/${retryKey}`)

  documentRef.get()
    .then(documentSnapshot => {
      if (documentSnapshot.exists) {
        if (Date.now() - documentSnapshot.updateTime.toDate().getTime() > 5 * 60 * 1000) {
          documentRef.delete().catch(console.error)
        } else {
          console.log(`> Skip retry: ${retryKey}`)
          return
        }
      }

      let queueList = appData[action] && appData[action][queue]
      if (!Array.isArray(queueList)) {
        queueList = []
      }
      queueList.unshift(nextId)

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          updateAppData(appSession, {
            [action]: {
              [queue]: queueList
            }
          })
            .then(() => documentRef.set({
              d: new Date().toISOString()
            }))
            .then(resolve)
            .catch(reject)
        }, 7000)
      })
    })
    .catch(console.error)
}

const log = ({ appSdk, storeId }, queueEntry, payload) => {
  const isError = payload instanceof Error
  const isImportation = queueEntry.action === 'importation'
  if (!isError && isImportation) {
    return null
  }

  appSdk.getAuth(storeId)
    .then(auth => {
      return getAppData({ appSdk, storeId, auth })
        .then(appData => {
          let { logs } = appData
          if (!Array.isArray(logs)) {
            logs = []
          }
          const logEntry = {
            resource: /order/i.test(queueEntry.queue) ? 'orders' : 'products',
            [(isImportation ? 'ideris_id' : 'resource_id')]: queueEntry.nextId,
            success: !isError,
            timestamp: new Date().toISOString()
          }

          let notes
          if (!isError) {
            if (payload) {
              const { data, status } = payload
              if (data) {
                if (typeof data === 'string' || typeof data === 'number') {
                  logEntry.ideris_id = String(data)
                } else if (data.id) {
                  logEntry.ideris_id = String(data.id)
                } else if (data._id) {
                  logEntry.resource_id = data._id
                }
              }
              notes = `Status ${status}`
            }
          } else {
            const { config, response } = payload
            if (response) {
              const { data, status } = response
              notes = `Error: Status ${status} \n${JSON.stringify(data)}`
              if (!status || status > 403) {
                queueRetry({ appSdk, storeId, auth }, queueEntry, appData, response)
              }
              if (config) {
                const { url, method, data } = config
                notes += `\n\n-- Request -- \n${method} ${url} \n${JSON.stringify(data)}`
              }
            } else {
              notes = payload.stack
            }
          }
          if (notes) {
            logEntry.notes = notes.substring(0, 5000)
          }

          if (queueEntry.documentRef && queueEntry.documentRef.get) {
            queueEntry.documentRef.get()
              .then(documentSnapshot => {
                if (documentSnapshot.exists) {
                  const data = documentSnapshot.data()
                  return queueEntry.documentRef.set({
                    key: data.key === queueEntry.key ? '~' : data.key,
                    count: data.count ? data.count - 1 : 0
                  })
                }
              })
              .catch(console.error)
          }

          logs.unshift(logEntry)
          return updateAppData({ appSdk, storeId, auth }, {
            logs: logs.slice(0, 200)
          }, true)
        })
    })
    .catch(console.error)
}

const handleJob = (appSession, queueEntry, job) => {
  job
    .then(payload => {
      if (payload) {
        if (typeof payload.then === 'function') {
          handleJob(appSession, queueEntry, payload)
        } else {
          log(appSession, queueEntry, payload)
        }
      }
      return true
    })
    .catch(err => log(appSession, queueEntry, err))
}

module.exports = handleJob
