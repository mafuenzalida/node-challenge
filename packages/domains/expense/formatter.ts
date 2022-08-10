import { Expense, Currency, ExpenseStatus } from './types';

const expensePublicFields = ['merchant_name', 'amount_in_cents', 'currency', 'status', 'date_created']

function formatExpense(rawExpense: any): Expense {
  return {
    id: rawExpense.id,
    user_id: rawExpense.user_id,
    merchant_name: rawExpense.merchant_name,
    currency: Currency[rawExpense.currency],
    amount_in_cents: rawExpense.amount_in_cents,
    status: ExpenseStatus[rawExpense.status?.toUpperCase()],
    date_created: rawExpense.date_created,
    date_updated: Date[rawExpense.date_updated] || null,
  }
}

function formatExpenses(rawExpenses: any): Expense[] {
  return rawExpenses?.map( rawExpense => formatExpense(rawExpense))
}

function secureTrimExpense(expense: Expense): object {
  return JSON.parse(JSON.stringify(expense, expensePublicFields));
}

function secureTrimExpenses(expenses: Expense[]): object[] {
  return expenses?.map( expense => secureTrimExpense(expense));
}


export {
  formatExpense,
  formatExpenses,
  secureTrimExpense,
  secureTrimExpenses
}