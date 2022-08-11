export const getExpensesByUser = {
  tags: ['Expenses'],
  description: "Returns all expenses associated to a user",
  operationId: 'getExpensesByUser',
  parameters: [
    {
      in: "query",
      name: "userId",
      schema: {
        type: "uuid"
      },
      description: "UUID of the user from whom to obtain the expenses",
      required: true
    },
    {
      in: "query",
      name: "sortBy",
      schema: {
        type: "string"
      },
      description: "Field name to sort results by. Accepted values 'date_created', 'merchant_name'"
    },
    {
      in: "query",
      name: "orderBy",
      schema: {
        type: "string"
      },
      description: "Order by: asc or desc"
    },
    {
      in: "query",
      name: "merchant_name",
      schema: {
        type: "string"
      },
      description: "Filter by merchant name"
    },
    {
      in: "query",
      name: "status",
      schema: {
        type: "string"
      },
      description: "Filter by merchant status"
    },
    {
      in: "query",
      name: "date_created",
      schema: {
        type: "date"
      },
      description: "Filter by date in YYYY-MM-DD format"
    },
    {
      in: "query",
      name: "perPage",
      schema: {
        type: "integer",
        default: 10
      },
      description: "Pagination: Number of results per page",
    },
    {
      in: "query",
      name: "currentPage",
      schema: {
        type: "integer",
        default: 1
      },
      description: "Pagination: Current page",
    },
  ],
  responses: {
    "200": {          
      description: "A list with the user's expenses.",
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: {
              type: 'object',
              properties: {
                merchant_name: {
                  type: 'string',
                  description: `Merchant's name associated to the expense`
                },
                currency: {
                  type: 'string',
                  description: 'Currency of the expense'
                },
                amount_in_cents: {
                  type: 'string',
                  description: 'Amount expended in cents'
                },
                status: {
                  type: 'string',
                  description: 'Status of the expense'         
                },
                date_created: {
                  type: 'string',
                  description: 'Date when expense was made'
                },
              },
            },
          },
        },
      },
    },
    "400": {
      description: 'Bad request, may be a problem with the query string'
    },
    "404": {
      description: 'User not found with the given UUID'
    },
    "500": {
      description: 'Internal server error'
    }
  },
}