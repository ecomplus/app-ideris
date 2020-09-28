// read/update configured E-Com Plus app data
const getAppData = require('./../../lib/store-api/get-app-data')
const updateAppData = require('./../../lib/store-api/update-app-data')

// async integration handlers
const integrationHandlers = {
  exportation: {
    product_ids: require('./../../lib/integration/export-product')
  },
  importation: {
    skus: require('./../../lib/integration/import-product'),
    order_ids: require('./../../lib/integration/import-order')
  }
}

const SKIP_TRIGGER_NAME = 'SkipTrigger'
const ECHO_SUCCESS = 'SUCCESS'
const ECHO_SKIP = 'SKIP'
const ECHO_API_ERROR = 'STORE_API_ERR'

exports.post = ({ appSdk }, req, res) => {
  // receiving notification from Store API
  const { storeId } = req

  /**
   * Treat E-Com Plus trigger body here
   * Ref.: https://developers.e-com.plus/docs/api/#/store/triggers/
   */
  const trigger = req.body

  // get app configured options
  appSdk.getAuth(storeId).then(auth => {
    return getAppData({ appSdk, storeId, auth })

      .then(appData => {
        if (
          Array.isArray(appData.ignore_triggers) &&
          appData.ignore_triggers.indexOf(trigger.resource) > -1
        ) {
          // ignore current trigger
          const err = new Error()
          err.name = SKIP_TRIGGER_NAME
          throw err
        }

        /* DO YOUR CUSTOM STUFF HERE */

        const resourceId = trigger.resource_id || trigger.inserted_id
        console.log(`> Webhook #${storeId} ${resourceId} [${trigger.resource}]`)

        const iderisLoginToken = appData.ideris_login_token
        if (typeof iderisLoginToken === 'string' && iderisLoginToken) {
          let integrationConfig
          let canCreateNew = false
          switch (trigger.resource) {
            case 'applications':
              integrationConfig = appData
              canCreateNew = true
              break
            case 'products':
              if (trigger.body) {
                if (trigger.action === 'create') {
                  if (!appData.new_products) {
                    break
                  }
                  canCreateNew = true
                } else if (
                  (!trigger.body.quantity || !appData.update_quantity) &&
                  (!trigger.body.price || !appData.update_price)
                ) {
                  break
                }
                integrationConfig = {
                  exportation: {
                    product_ids: [resourceId]
                  }
                }
              }
              break
          }

          if (integrationConfig) {
            const actions = Object.keys(integrationHandlers)
            for (let i = 0; i < actions.length; i++) {
              const action = actions[i]
              if (typeof integrationConfig[action] === 'object' && integrationConfig[action]) {
                const queue = Object.keys(integrationConfig[action])[0]
                const ids = integrationConfig[action][queue]
                if (Array.isArray(ids) && integrationHandlers[action][queue]) {
                  const nextId = ids[0]
                  if (typeof nextId === 'string' && nextId.length) {
                    console.log(`> Starting ${action} ${nextId}`)
                    return integrationHandlers[action][queue](
                      { appSdk, storeId },
                      iderisLoginToken,
                      { action, queue, nextId },
                      appData,
                      canCreateNew
                    ).then(() => ({ appData, action, queue }))
                  }
                }
              }
            }
          }
        }
        // console.log('> Skip webhook:', JSON.stringify(appData))

        // nothing to do
        return {}
      })

      .then(({ appData, action, queue }) => {
        if (appData && appData[action] && Array.isArray(appData[action][queue])) {
          res.status(202).send(`> Processed \`${action}.${queue}\``)
          return updateAppData({ appSdk, storeId, auth }, {
            [action]: {
              [queue]: appData[action][queue].slice(1)
            }
          })
        }
        res.send(ECHO_SUCCESS)
      })
  })

    .catch(err => {
      if (err.name === SKIP_TRIGGER_NAME) {
        // trigger ignored by app configuration
        res.send(ECHO_SKIP)
      } else {
        // console.error(err)
        // request to Store API with error response
        // return error status code
        res.status(500)
        const { message } = err
        res.send({
          error: ECHO_API_ERROR,
          message
        })
      }
    })
}
