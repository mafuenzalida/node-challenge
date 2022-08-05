import { ApiError } from '@nc/utils/errors';
import { Router } from 'express';
import { to } from '@nc/utils/async';
import { getExpensesDetailByUser } from '../model';

export const router = Router();

router.get('/get-expenses-by-user', async (req, res, next) => {
  const [expenseError, userExpenses] = await to(getExpensesDetailByUser(req.query?.userId));

  if (expenseError) {
    return next(new ApiError(expenseError, expenseError.status, `Could not get user expenses: ${expenseError}`, expenseError.title, req));
  }

  if (!userExpenses) {
    return res.json({});
  }

  return res.json(userExpenses);
});
