enum Currency {
  EUR = 'EUR',
  USD = 'USD',
}

enum ExpenseStatus {
  PENDING = 'PENDING',
  PROCESSED = 'PROCESSED',
}

interface Expense {
  id: string
  user_id: string
  merchant_name: number
  currency: Currency
  amount_in_cents: number
  status: ExpenseStatus
  date_created: Date
  date_updated: Date
}

export {
  Expense,
  ExpenseStatus,
  Currency
}