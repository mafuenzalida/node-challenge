import knex from '@nc/utils/db/knex';
import { QueryOptions } from '@nc/utils/types';

async function getExpensesByUser(userId: string, options?: QueryOptions) {
  if (options.orderBy) {
    return await knex.select('*')
    .from('expenses')
    .where('user_id', userId)
    .orderBy(options.sortBy,options.orderBy)
    .paginate({ 
      perPage: options.perPage || 10,
      currentPage: options.currentPage || 1,
    })
  } else {
    return await knex.select('*')
    .from('expenses')
    .where('user_id', userId)
    .paginate({ 
      perPage: options.perPage || 10,
      currentPage: options.currentPage || 1,
    })
  }
}

export {
  getExpensesByUser,
}
