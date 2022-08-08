import { Api } from '../utils/api';

const expenseV1Route = '/user/v1';

describe("testing-user-v1-routes", () => {
  it("GET /get-user-details - success", async () => {
    const { body } = await Api.get(expenseV1Route + '/get-user-details')
      .query({ userId: 'e17825a6-ad80-41bb-a76b-c5ee17b2f29d' });
    expect(body).toEqual(
      {
        first_name: "Petr",
        last_name: "Janda",
        company_name: "pleo"
      },
    );
  });
});