import request from 'supertest';
import express from 'express';
import { router } from '@nc/domain-user/routes/v1-get-user';
import * as dbExpense from '@nc/domain-user/data/db-user';

const app = express();
app.use('/', router);

jest.mock('@nc/domain-user/data/db-user')

const fakeUser = {
  id: 'some-id',
  first_name: 'first_name',
  last_name: 'last_name',
  company_name: 'some company',
  ssn: 'fake ssn',
}
const fakeUserResponse = {
  first_name: 'First_name',
  last_name: 'Last_name',
  company_name: 'some company'
}

describe('V1-get-user routes tests', () => {
  beforeAll(() => {
    const mockReadUser = dbExpense.readUser as jest.MockedFunction<typeof dbExpense.readUser>;;
    mockReadUser.mockResolvedValue(fakeUser)
  })

  it('GET /get-user-details - success responding with user public fields', async () => {
    const res = await request(app)
      .get('/get-user-details')
      .query({ userId: 'fake-uuid' });
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual(fakeUserResponse)
  })

  it('GET /get-user-details - fails when not sending userId', async () => {
    const res = await request(app)
      .get('/get-user-details')
      .query({ });
    expect(res.statusCode).toEqual(400)
  })

  it('GET /get-user-details - fails when there is no data for user', async () => {
    const mockReadUser = dbExpense.readUser as jest.MockedFunction<typeof dbExpense.readUser>;;
    mockReadUser.mockResolvedValue(null)
   
    const res = await request(app)
      .get('/get-user-details')
      .query({ userId: 'fake-uuid' });
    expect(res.statusCode).toEqual(404)
  })

  it('GET /get-user-details - fails when there is no data for user', async () => {
    const mockReadUser = dbExpense.readUser as jest.MockedFunction<typeof dbExpense.readUser>;;
    mockReadUser.mockRejectedValue({})
   
    const res = await request(app)
      .get('/get-user-details')
      .query({ userId: 'fake-uuid' });
    expect(res.statusCode).toEqual(500)
  })
})