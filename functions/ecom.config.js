/* eslint-disable comma-dangle, no-multi-spaces, key-spacing */

/**
 * Edit base E-Com Plus Application object here.
 * Ref.: https://developers.e-com.plus/docs/api/#/store/applications/
 */

const app = {
  app_id: 102110,
  title: 'Ideris',
  slug: 'ideris',
  type: 'external',
  state: 'active',
  authentication: true,

  /**
   * Uncomment modules above to work with E-Com Plus Mods API on Storefront.
   * Ref.: https://developers.e-com.plus/modules-api/
   */
  modules: {
    /**
     * Triggered to calculate shipping options, must return values and deadlines.
     * Start editing `routes/ecom/modules/calculate-shipping.js`
     */
    // calculate_shipping:   { enabled: true },

    /**
     * Triggered to validate and apply discount value, must return discount and conditions.
     * Start editing `routes/ecom/modules/apply-discount.js`
     */
    // apply_discount:       { enabled: true },

    /**
     * Triggered when listing payments, must return available payment methods.
     * Start editing `routes/ecom/modules/list-payments.js`
     */
    // list_payments:        { enabled: true },

    /**
     * Triggered when order is being closed, must create payment transaction and return info.
     * Start editing `routes/ecom/modules/create-transaction.js`
     */
    // create_transaction:   { enabled: true },
  },

  /**
   * Uncomment only the resources/methods your app may need to consume through Store API.
   */
  auth_scope: {
    'stores/me': [
      'GET'            // Read store info
    ],
    procedures: [
      'POST'           // Create procedures to receive webhooks
    ],
    products: [
      'GET',           // Read products with public and private fields
      'POST',          // Create products
      // 'PATCH',         // Edit products
      // 'PUT',           // Overwrite products
      // 'DELETE',        // Delete products
    ],
    brands: [
      // 'GET',           // List/read brands with public and private fields
      // 'POST',          // Create brands
      // 'PATCH',         // Edit brands
      // 'PUT',           // Overwrite brands
      // 'DELETE',        // Delete brands
    ],
    categories: [
      // 'GET',           // List/read categories with public and private fields
      // 'POST',          // Create categories
      // 'PATCH',         // Edit categories
      // 'PUT',           // Overwrite categories
      // 'DELETE',        // Delete categories
    ],
    customers: [
      // 'GET',           // List/read customers
      // 'POST',          // Create customers
      // 'PATCH',         // Edit customers
      // 'PUT',           // Overwrite customers
      // 'DELETE',        // Delete customers
    ],
    orders: [
      'GET',           // List/read orders with public and private fields
      // 'POST',          // Create orders
      // 'PATCH',         // Edit orders
      // 'PUT',           // Overwrite orders
      // 'DELETE',        // Delete orders
    ],
    carts: [
      // 'GET',           // List all carts (no auth needed to read specific cart only)
      // 'POST',          // Create carts
      // 'PATCH',         // Edit carts
      // 'PUT',           // Overwrite carts
      // 'DELETE',        // Delete carts
    ],

    /**
     * Prefer using 'fulfillments' and 'payment_history' subresources to manipulate update order status.
     */
    'orders/fulfillments': [
      // 'GET',           // List/read order fulfillment and tracking events
      // 'POST',          // Create fulfillment event with new status
      // 'DELETE',        // Delete fulfillment event
    ],
    'orders/payments_history': [
      // 'GET',           // List/read order payments history events
      // 'POST',          // Create payments history entry with new status
      // 'DELETE',        // Delete payments history entry
    ],

    /**
     * Set above 'quantity' and 'price' subresources if you don't need access for full product document.
     * Stock and price management only.
     */
    'products/inventory_records': [
      'POST'           // Create entry to product inventory
    ],
    'products/quantity': [
      // 'GET',           // Read product available quantity
      'PUT',           // Set product stock quantity
    ],
    'products/variations/quantity': [
      // 'GET',           // Read variaton available quantity
      'PUT',           // Set variation stock quantity
    ],
    'products/price': [
      // 'GET',           // Read product current sale price
      // 'PUT',           // Set product sale price
    ],
    'products/variations/price': [
      // 'GET',           // Read variation current sale price
      // 'PUT',           // Set variation sale price
    ],

    /**
     * You can also set any other valid resource/subresource combination.
     * Ref.: https://developers.e-com.plus/docs/api/#/store/
     */
  },

  admin_settings: {
    ideris_login_token: {
      schema: {
        type: 'string',
        maxLength: 255,
        title: 'Token da API Ideris',
        description: 'https://suporte.ideris.com.br/portal/pt/kb/articles/como-gerar-token-da-api-p%C3%BAblica-do-ideris'
      },
      hide: true
    },
    automations: {
      schema: {
        title: 'Automações',
        description: 'Sincronizações automáticas entre E-Com Plus e Ideris',
        type: 'object',
        properties: {
          new_products: {
            type: 'boolean',
            default: false,
            title: 'Exportar novos produtos'
          },
          new_orders: {
            type: 'boolean',
            default: true,
            title: 'Exportar novos pedidos'
          },
          update_quantity: {
            type: 'boolean',
            default: true,
            title: 'Exportar estoques',
            description: 'Atualizar estoques de produtos exportados'
          },
          update_price: {
            type: 'boolean',
            default: false,
            title: 'Exportar preços',
            description: 'Atualizar preços de produtos exportados'
          },
          sync_quantity: {
            type: 'boolean',
            default: true,
            title: 'Sincronizar estoques',
            description: 'Importar estoques após pedidos novos ou atualizados no Ideris'
          }
        }
      },
      hide: true
    },
    exportation: {
      schema: {
        title: 'Exportação manual',
        description: 'Fila a exportar para o Ideris, serão removidos automaticamente após exportação',
        type: 'object',
        properties: {
          product_ids: {
            title: 'Produtos a exportar',
            type: 'array',
            items: {
              type: 'string',
              pattern: '^[a-f0-9]{24}$',
              title: 'ID do produto'
            }
          }
        }
      },
      hide: false
    },
    importation: {
      schema: {
        title: 'Importação manual',
        description: 'Fila a importar do Ideris, serão removidos automaticamente após importação',
        type: 'object',
        properties: {
          skus: {
            title: 'Produtos a importar',
            type: 'array',
            items: {
              type: 'string',
              title: 'SKU do produto no Ideris'
            }
          },
          order_ids: {
            title: 'Pedidos a importar',
            type: 'array',
            items: {
              type: 'string',
              title: 'ID do pedido no Ideris'
            }
          }
        }
      },
      hide: false
    },
    ideris_product_data: {
      schema: {
        title: 'Configuração para novos produtos no Ideris',
        description: 'IDs pré-definidos para produtos exportados da plataforma para o Ideris',
        type: 'object',
        properties: {
          categoriaIdIderis: {
            type: 'integer',
            minimum: 1,
            maximum: 999999,
            default: 1,
            title: 'Categoria no Ideris'
          },
          subCategoriaIdIderis: {
            type: 'integer',
            minimum: 1,
            maximum: 999999,
            default: 1,
            title: 'Subcategoria no Ideris'
          },
          marcaIdIderis: {
            type: 'integer',
            minimum: 1,
            maximum: 999999,
            default: 1,
            title: 'Marca no Ideris'
          },
          departamentoIdIderis: {
            type: 'integer',
            minimum: 1,
            maximum: 999999,
            default: 8,
            title: 'Departamento no Ideris'
          },
          categoriaML: {
            type: 'string',
            minLength: 4,
            maxLength: 12,
            default: 'MLB3530',
            title: 'ID da categoria no ML',
            description: 'Categoria do Mercado Livre conforme https://api.mercadolibre.com/sites/MLB/categories'
          }
        }
      },
      hide: true
    },
    logs: {
      schema: {
        title: 'Logs',
        type: 'array',
        maxItems: 300,
        items: {
          title: 'Registro de log',
          type: 'object',
          properties: {
            resource: {
              type: 'string',
              maxLength: 255,
              title: 'Recurso'
            },
            resource_id: {
              type: 'string',
              pattern: '^[a-f0-9]{24}$',
              title: 'ID do recurso'
            },
            ideris_id: {
              type: 'string',
              maxLength: 255,
              title: 'ID do recurso no Ideris'
            },
            timestamp: {
              type: 'string',
              format: 'date-time',
              title: 'Horário'
            },
            success: {
              type: 'boolean',
              default: true,
              title: 'Sucesso'
            },
            notes: {
              type: 'string',
              maxLength: 5000,
              title: 'Notas'
            }
          }
        }
      },
      hide: true
    }
  }
}

/**
 * List of Procedures to be created on each store after app installation.
 * Ref.: https://developers.e-com.plus/docs/api/#/store/procedures/
 */

const procedures = []

/**
 * Uncomment and edit code above to configure `triggers` and receive respective `webhooks`:
 */

const { baseUri } = require('./__env')

procedures.push({
  title: app.title,

  triggers: [
    /* Receive notifications when new order is created:
    {
      resource: 'orders',
      action: 'create',
    },
    */

    // Receive notifications when order financial/fulfillment status changes:
    {
      resource: 'orders',
      field: 'financial_status',
    },
    {
      resource: 'orders',
      field: 'fulfillment_status',
    },

    // Receive notifications when products/variations stock quantity changes:
    {
      resource: 'products',
      field: 'quantity',
    },
    {
      resource: 'products',
      subresource: 'variations',
      field: 'quantity'
    },
    {
      resource: 'products',
      field: 'price'
    },
    {
      resource: 'products',
      subresource: 'variations',
      field: 'price'
    },

    /* Receive notifications when cart is edited:
    {
      resource: 'carts',
      action: 'change',
    },

    // Receive notifications when customer is deleted:
    {
      resource: 'customers',
      action: 'delete',
    },

    // Feel free to create custom combinations with any Store API resource, subresource, action and field.
    */
  ],

  webhooks: [
    {
      api: {
        external_api: {
          uri: `${baseUri}/ecom/webhook`
        }
      },
      method: 'POST'
    }
  ]
})

/**
 * You may also edit `routes/ecom/webhook.js` to treat notifications properly.
 */

exports.app = app

exports.procedures = procedures
