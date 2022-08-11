enum Currency {
  EUR = 'EUR',
  USD = 'USD',
  DKK = 'DKK',
}

enum ExpenseStatus {
  PENDING = 'PENDING',
  PROCESSED = 'PROCESSED',
}

interface Expense {
  id: string
  user_id: string
  merchant_name: string
  currency: Currency
  amount_in_cents: number
  status: ExpenseStatus
  date_created: Date
  date_updated: Date
}

interface IExpenseQueryFilters {
  merchant_name: string,
  status: string,
  date_created: string
}

export {
  Expense,
  ExpenseStatus,
  Currency,
  IExpenseQueryFilters
}