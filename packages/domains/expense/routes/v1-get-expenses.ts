import { ApiError } from '@nc/utils/errors';
import { Router } from 'express';

export const router = Router();

router.get('/get-user-expenses', (req, res, next) => {
  const [userError, userExpenses] = [null, null];

  if (userError) {
    return next(new ApiError(userError, userError.status, `Could not get user expenses: ${userError}`, userError.title, req));
  }

  if (!userExpenses) {
    return res.json({});
  }

  return res.json(userExpenses);
});
