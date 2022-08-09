import { ApiError } from '@nc/utils/errors';
import { Router } from 'express';
import { to } from '@nc/utils/async';
import { getExpensesDetailByUser } from '../model';
import { IPaginateParams } from 'knex-paginate';

export const router = Router();

router.get('/get-expenses-by-user', async (req, res, next) => {
  const userId = req.query?.userId as string
  const paginateParams = { 
    perPage: parseInt(req.query?.perPage as string), 
    currentPage: parseInt(req.query?.currentPage as string)
  }

  const [expenseError, paginatedData] = await to(getExpensesDetailByUser(
    userId,
    paginateParams,
  ));

  if (expenseError) {
    return next(new ApiError(expenseError, expenseError.status, `Could not get user expenses: ${expenseError}`, expenseError.title, req));
  }

  if (!paginatedData) {
    return res.json({});
  }

  return res.json(paginatedData)
});
