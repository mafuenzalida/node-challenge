import knex from 'knex';
import knexconfig from '../../../config/knexconfig';
import { attachPaginate } from 'knex-paginate';

const env = process.env.NODE_ENV || 'development';
const configOptions = knexconfig[env];
const knexExport = knex(configOptions);

attachPaginate()

export default knexExport;
