import { getExpensesByUser } from './docs/expenses.swagger';
import { getUserDetails } from './docs/user.swagger';

export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
      version: '1.0.0',
      title: 'Pleo APIs Document',
      description: `Specification API document with pleo's domains routes`,
      termsOfService: '',
      contact: {
          name: 'Pleo',
      },
  },
  tags: {
    name: 'Expenses'
  },
  paths: {
    "/v1/user/get-user-details": {
        "get": getUserDetails
    },
    "/v1/expenses/get-expenses-by-user": {
        "get": getExpensesByUser
    },
  },
}