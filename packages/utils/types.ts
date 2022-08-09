import { IPaginateParams } from 'knex-paginate';

interface IQuerySort {
  sortBy: string,
  orderBy: string,
}


type QueryOptions = IPaginateParams & IQuerySort

export {
  QueryOptions
}