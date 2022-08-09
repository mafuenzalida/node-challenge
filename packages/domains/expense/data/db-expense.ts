import knex from '@nc/utils/db/knex';
import { QueryOptions } from '@nc/utils/types';

async function getExpensesByUser(userId: string, options?: QueryOptions) {
  const query = knex.select('*')
    .from('expenses')
    .where('user_id', userId)
  
  if (options.orderBy) {
    query.orderBy(options.sortBy,options.orderBy)
  }
  
  try {
    return await query.paginate({ 
      perPage: options.perPage || 10,
      currentPage: options.currentPage || 1,
    })
  }
  catch(error) {
    throw error;
  }
}

export {
  getExpensesByUser,
}
