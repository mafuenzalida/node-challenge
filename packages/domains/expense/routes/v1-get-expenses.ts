import { ApiError } from '@nc/utils/errors';
import { Router } from 'express';
import { to } from '@nc/utils/async';
import { getExpensesDetailByUser } from '../model';
import QueryValidators from '../middlewares/query-validator';
import { secureTrimExpenses } from '../formatter';

export const router = Router();

router.get('/get-expenses-by-user', QueryValidators('expense_by_user_query'), async (req, res, next) => {
  const userId = req.query.userId as string
  const options = { 
    perPage: parseInt(req.query.perPage as string), 
    currentPage: parseInt(req.query.currentPage as string),
    sortBy: req.query.sortBy as string,
    orderBy: req.query.orderBy as string
  }
  const filters = {
    merchant_name: req.query.merchant_name as string,
    status: req.query.status as string,
    date_created: req.query.date_created as string
  }

  const [expenseError, paginatedData] = await to(getExpensesDetailByUser(
    userId,
    options,
    filters,
  ));

  if (expenseError) {
    return next(new ApiError(
      expenseError, 
      expenseError.status, 
      `Could not get user expenses: ${expenseError}`, 
      expenseError.title, req
    ));
  }

  if (!paginatedData) {
    return res.json({});
  }

  return res.json({
    data: secureTrimExpenses(paginatedData.data),
    pagination: paginatedData.pagination  
  })
});
