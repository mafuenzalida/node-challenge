import { raw } from 'express';
import { Expense, Currency, ExpenseStatus } from './types';

function formatExpense(rawExpense): Expense {
  return {
    id: rawExpense.id,
    user_id: rawExpense.user_id,
    merchant_name: rawExpense.merchant_name,
    currency: Currency[rawExpense.currency],
    amount_in_cents: rawExpense.amount_in_cents,
    status: ExpenseStatus[rawExpense.status.toUpperCase()],
    date_created: rawExpense.date_created,
    date_updated: Date[rawExpense.date_updated] || null,
  }
}

function formatExpenses(rawExpenses): Expense[] {
  return rawExpenses.map( rawExpense => formatExpense(rawExpense))
}

export {
  formatExpenses
}