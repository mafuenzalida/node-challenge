export const getUserDetails = {
  tags: ['User'],
  description: "Returns the information of a user",
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
  ],
  responses: {
    "200": {          
      description: "User's data.",
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: {
              type: 'object',
              properties: {
                first_name: {
                  type: 'string',
                  description: `User's first name`
                },
                last_name: {
                  type: 'string',
                  description: `User's last name`
                },
                company_name: {
                  type: 'string',
                  description: `User's company name`
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
