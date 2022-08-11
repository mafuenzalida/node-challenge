import { Api } from '../utils/api';

const expenseV1Route = '/expense/v1';

describe("testing-expense-v1-routes", () => {
  it("GET /get-expenses-by-user - success", async () => {
    const { body } = await Api.get(expenseV1Route + '/get-expenses-by-user')
      .query({ userId: 'e17825a6-ad80-41bb-a76b-c5ee17b2f29d' });
    expect(body.data).toEqual([
      {
        merchant_name: "Cafe 22",
        amount_in_cents: 4450,
        currency: "DKK",
        status: "PENDING",
        date_created: "2021-09-21T23:57:40.021Z",
      },
    ]);
  });
});