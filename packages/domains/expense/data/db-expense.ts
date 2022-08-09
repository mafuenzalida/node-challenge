import knex from '@nc/utils/db/knex';
import { IPaginateParams } from 'knex-paginate';

async function getExpensesByUser(userId: string, paginateParams?: IPaginateParams) {
  return await knex.select('*')
    .from('expenses')
    .where('user_id', userId)
    .paginate({ 
      perPage: paginateParams?.perPage || 10,
      currentPage: paginateParams?.currentPage || 1,
    })
}

export {
  getExpensesByUser,
}
