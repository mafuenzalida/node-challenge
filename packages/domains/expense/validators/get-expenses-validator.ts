import joiBase from 'joi';
import joiDate from '@joi/date';
const joi = joiBase.extend(joiDate);

const getExpenseByUserQuerySchema = joi.object({
    userId: joi.string().uuid().required(),
    sortBy: joi.string().min(1),
    orderBy: joi.string().min(1),
    merchant_name: joi.string().min(1).max(50),
    status: joi.string().min(1).max(25),
    date_created: joi.date().format('YYYY-MM-DD').raw(),
    perPage: joi.number().greater(0),
    currentPage: joi.number().greater(0),
});

module.exports = {
  expense_by_user_query: getExpenseByUserQuerySchema,
};