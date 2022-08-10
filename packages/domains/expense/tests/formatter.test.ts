import { formatExpense, formatExpenses } from '../formatter';

const fakeDBExpenses = [
  {
    id: 'some-id',
    user_id: 'user-id',
    merchant_name: 'some-merchant',
    currency: 'USD',
    amount_in_cents: 10,
    status: 'pending',
    date_created: 'some-date',
  },
  {
    id: 'some-id-2',
    user_id: 'user-id',
    merchant_name: 'some-merchant-2',
    currency: 'EUR',
    amount_in_cents: 5,
    status: 'processed',
    date_created: 'some-date-2',
  }
]

const fakeExpensesFormatted = [
  {
    id: 'some-id',
    user_id: 'user-id',
    merchant_name: 'some-merchant',
    currency: 'USD',
    amount_in_cents: 10,
    status: 'PENDING',
    date_created: 'some-date',
    date_updated: null,
  },
  {
    id: 'some-id-2',
    user_id: 'user-id',
    merchant_name: 'some-merchant-2',
    currency: 'EUR',
    amount_in_cents: 5,
    status: 'PROCESSED',
    date_created: 'some-date-2',
    date_updated: null,
  },
]

describe('expense-domain/formatter - formatExpense', () => {
  it('should return an instance of expense correctly formatted from raw data', () => {
    const result = formatExpense(fakeDBExpenses[0]);
    expect(result).toEqual(fakeExpensesFormatted[0]);
  });
  it('should return status in upper case letters', () => {
    const result = formatExpense(fakeDBExpenses[0]);
    expect(result.status).toEqual("PENDING");
  });
});

describe('expense-domain/formatter - formatExpenses', () => {
  it('should return a list of expenses correctly formatted from raw data', () => {
    const result = formatExpenses(fakeDBExpenses);
    expect(result).toEqual(fakeExpensesFormatted);
  });
});
