import knex from '@nc/utils/db/knex';
import { QueryOptions } from '@nc/utils/types';
import { IExpenseQueryFilters } from '../types';

async function getExpensesByUser(userId: string, options: QueryOptions, filters: IExpenseQueryFilters): Promise<any> {
  const query = knex.select('*')
    .from('expenses')
    .where('user_id', userId)
  
  if (options.orderBy) {
    query.orderBy(options.sortBy,options.orderBy)
  }

  if (filters.merchant_name) {
    query.where('merchant_name', 'like', filters.merchant_name)
  }
  if (filters.status) {
    query.where('status', 'like', filters.status)
  }
  if (filters.date_created) {
    const endOfDate = filters.date_created + ' 24:00:00'
    query.whereBetween('date_created', [filters.date_created,endOfDate])
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
