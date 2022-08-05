import knex from '@nc/utils/db/knex';

async function getExpensesByUser(userId: string) {
  return await knex.select('*')
    .from('expenses')
    .where('user_id', userId)
}

export {
  getExpensesByUser,
}
