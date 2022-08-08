import request from 'supertest';
import express from 'express';
import { router } from '@nc/domain-expense/routes/v1-get-expenses';
import * as dbExpense from '@nc/domain-expense/data/db-expense';

const app = express();
app.use('/', router);

jest.mock('@nc/domain-expense/data/db-expense')

const fakeUserExpenses = [{
  id: 'some-id',
  user_id: 'user-id',
  merchant_name: 'some-merchant',
  currency: 'USD',
  amount_in_cents: 10,
  status: 'pending',
  date_created: 'some-date',
}]
const fakeUserExpensesResponse = [{
  id: 'some-id',
  user_id: 'user-id',
  merchant_name: 'some-merchant',
  currency: 'USD',
  amount_in_cents: 10,
  status: 'PENDING',
  date_created: 'some-date',
  date_updated: null,
}]

describe('V1-get-expenses routes tests', () => {
  beforeAll(() => {
    const mockGetExpensesByUser = dbExpense.getExpensesByUser as jest.MockedFunction<typeof dbExpense.getExpensesByUser>;;
    mockGetExpensesByUser.mockResolvedValue(fakeUserExpenses)
  })

  it('GET /get-expenses-by-user - success', async () => {
    const res = await request(app)
      .get('/get-expenses-by-user')
      .query({ userId: 'fake-uuid' });
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual(fakeUserExpensesResponse)
  })

  it('GET /get-expenses-by-user - fails when not sending userId', async () => {
    const res = await request(app)
      .get('/get-expenses-by-user')
      .query({ });
    expect(res.statusCode).toEqual(400)
  })

  it('GET /get-expenses-by-user - fails when there is no data for user', async () => {
    const mockGetExpensesByUser = dbExpense.getExpensesByUser as jest.MockedFunction<typeof dbExpense.getExpensesByUser>;;
    mockGetExpensesByUser.mockResolvedValue(null)
   
    const res = await request(app)
      .get('/get-expenses-by-user')
      .query({ userId: 'fake-uuid' });
    expect(res.statusCode).toEqual(404)
  })

  it('GET /get-expenses-by-user - fails when there is no data for user', async () => {
    const mockGetExpensesByUser = dbExpense.getExpensesByUser as jest.MockedFunction<typeof dbExpense.getExpensesByUser>;;
    mockGetExpensesByUser.mockRejectedValue({})
   
    const res = await request(app)
      .get('/get-expenses-by-user')
      .query({ userId: 'fake-uuid' });
    expect(res.statusCode).toEqual(500)
  })
})
