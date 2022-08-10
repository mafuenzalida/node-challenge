import request from 'supertest';
import express from 'express';
import { router } from '@nc/domain-expense/routes/v1-get-expenses';
import * as dbExpense from '@nc/domain-expense/data/db-expense';

const app = express();
app.use('/', router);

jest.mock('@nc/domain-expense/data/db-expense')

const fakePagination = {
  perPage: 10,
  currentPage: 1,
  from: 0,
  to: 1
}
const fakeDbUserExpenses = {
  data : [
    {
      id: '20354d7a-e4fe-47af-8ff6-187bca92f3f9',
      user_id: '1fefa2cb-2543-4fda-ab58-7c8bd8b733d3',
      merchant_name: 'some-merchant',
      currency: 'USD',
      amount_in_cents: 10,
      status: 'pending',
      date_created: '2022-01-01',
    },
    {
      id: 'de6de2fa-1a12-4873-95a5-3810ff392603',
      user_id: '1fefa2cb-2543-4fda-ab58-7c8bd8b733d3',
      merchant_name: 'some-merchant-2',
      currency: 'EUR',
      amount_in_cents: 5,
      status: 'processed',
      date_created: '2022-01-02',
    }
  ],
  pagination: fakePagination
}
const fakeUserExpensesDataResponse = [
  {
    merchant_name: 'some-merchant',
    currency: 'USD',
    amount_in_cents: 10,
    status: 'PENDING',
    date_created: '2022-01-01',
  },
  {
    merchant_name: 'some-merchant-2',
    currency: 'EUR',
    amount_in_cents: 5,
    status: 'PROCESSED',
    date_created: '2022-01-02',
  },
]

describe('V1-get-expenses routes tests', () => {
  beforeAll(() => {
    const mockGetExpensesByUser = dbExpense.getExpensesByUser as jest.MockedFunction<typeof dbExpense.getExpensesByUser>;;
    mockGetExpensesByUser.mockResolvedValue(fakeDbUserExpenses)
  })

  it('GET /get-expenses-by-user - success', async () => {
    const res = await request(app)
      .get('/get-expenses-by-user')
      .query({ userId: '1fefa2cb-2543-4fda-ab58-7c8bd8b733d3' });
    expect(res.statusCode).toEqual(200)
    expect(res.body.data).toEqual(fakeUserExpensesDataResponse)
  })

  // VALIDATIONS
  it('GET /get-expenses-by-user - fails when not sending userId', async () => {
    const res = await request(app)
      .get('/get-expenses-by-user')
      .query({ });
    expect(res.statusCode).toEqual(400)
  })

  it('GET /get-expenses-by-user - fails when sending empty sortBy', async () => {
    const res = await request(app)
      .get('/get-expenses-by-user')
      .query({
        userId: '1fefa2cb-2543-4fda-ab58-7c8bd8b733d3',
        sortBy: ''
      });
    expect(res.statusCode).toEqual(400)
  })

  it('GET /get-expenses-by-user - fails when sending empty orderBy', async () => {
    const res = await request(app)
      .get('/get-expenses-by-user')
      .query({
        userId: '1fefa2cb-2543-4fda-ab58-7c8bd8b733d3',
        orderBy: ''
      });
    expect(res.statusCode).toEqual(400)
  })

  it('GET /get-expenses-by-user - fails when sending empty merchant_name', async () => {
    const res = await request(app)
      .get('/get-expenses-by-user')
      .query({
        userId: '1fefa2cb-2543-4fda-ab58-7c8bd8b733d3',
        merchant_name: ''
      });
    expect(res.statusCode).toEqual(400)
  })
  it('GET /get-expenses-by-user - fails when sending empty status', async () => {
    const res = await request(app)
      .get('/get-expenses-by-user')
      .query({
        userId: '1fefa2cb-2543-4fda-ab58-7c8bd8b733d3',
        status: ''
      });
    expect(res.statusCode).toEqual(400)
  })
  it('GET /get-expenses-by-user - fails when sending an invalid date_created', async () => {
    const res = await request(app)
      .get('/get-expenses-by-user')
      .query({
        userId: '1fefa2cb-2543-4fda-ab58-7c8bd8b733d3',
        date_created: '12/34/1560'
      });
    expect(res.statusCode).toEqual(400)
  })
  it('GET /get-expenses-by-user - fails when sending a non positive number in perPage', async () => {
    const res = await request(app)
      .get('/get-expenses-by-user')
      .query({
        userId: '1fefa2cb-2543-4fda-ab58-7c8bd8b733d3',
        perPage: 0
      });
    expect(res.statusCode).toEqual(400)
  })
  it('GET /get-expenses-by-user - fails when sending a non positive number in currentPage', async () => {
    const res = await request(app)
      .get('/get-expenses-by-user')
      .query({
        userId: '1fefa2cb-2543-4fda-ab58-7c8bd8b733d3',
        currentPage: 0
      });
    expect(res.statusCode).toEqual(400)
  })
  // ----------------------

  it('GET /get-expenses-by-user - fails when not sending userId', async () => {
    const res = await request(app)
      .get('/get-expenses-by-user')
      .query({ });
    expect(res.statusCode).toEqual(400)
  })

  it('GET /get-expenses-by-user - fails when there is no data for user', async () => {
    const mockGetExpensesByUser = dbExpense.getExpensesByUser as jest.MockedFunction<typeof dbExpense.getExpensesByUser>;;
    mockGetExpensesByUser.mockResolvedValue({data: null, pagination: fakePagination})
   
    const res = await request(app)
      .get('/get-expenses-by-user')
      .query({ userId: '1fefa2cb-2543-4fda-ab58-7c8bd8b733d3' });
    expect(res.statusCode).toEqual(404)
  })

  it('GET /get-expenses-by-user - fails when there is an error with the db', async () => {
    const mockGetExpensesByUser = dbExpense.getExpensesByUser as jest.MockedFunction<typeof dbExpense.getExpensesByUser>;;
    mockGetExpensesByUser.mockRejectedValue({})
   
    const res = await request(app)
      .get('/get-expenses-by-user')
      .query({ userId: '1fefa2cb-2543-4fda-ab58-7c8bd8b733d3' });
    expect(res.statusCode).toEqual(500)
  })
})
