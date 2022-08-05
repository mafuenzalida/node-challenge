import { getExpensesByUser } from './data/db-expense';
import { to } from '@nc/utils/async';
import { Expense } from './types';
import { BadRequest, InternalError, NotFound } from '@nc/utils/errors';
import { formatExpenses } from './formatter';

export async function getExpensesDetailByUser(userId): Promise<Expense[]> {
  if (!userId) {
    throw BadRequest('userId property is missing.');
  }

  const [dbError, rawExpenses] = await to(getExpensesByUser(userId));

  if (dbError) {
    throw InternalError(`Error fetching data from the DB: ${dbError.message}`);
  }

  if (!rawExpenses) {
    throw NotFound(`Could not find any expenses for the user with id ${userId}`);
  }

  return formatExpenses(rawExpenses);
}
