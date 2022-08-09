import { getExpensesByUser } from './data/db-expense';
import { to } from '@nc/utils/async';
import { Expense, IExpenseQueryFilters } from './types';
import { BadRequest, InternalError, NotFound } from '@nc/utils/errors';
import { formatExpenses } from './formatter';
import { IWithPagination } from 'knex-paginate';
import { QueryOptions } from '@nc/utils/types';

export async function getExpensesDetailByUser(userId: string, options: QueryOptions, filters: IExpenseQueryFilters): Promise<IWithPagination<Expense>> {
  if (!userId) {
    throw BadRequest('userId property is missing.');
  }

  const [dbError, paginatedData] = await to(getExpensesByUser(userId, options, filters));

  if (dbError) {
    throw InternalError(`Error fetching data from the DB: ${dbError.message}`);
  }

  if (!paginatedData.data) {
    throw NotFound(`Could not find any expenses for the user with id ${userId}`);
  }

  return { data: formatExpenses(paginatedData.data), pagination: paginatedData.pagination}
}
