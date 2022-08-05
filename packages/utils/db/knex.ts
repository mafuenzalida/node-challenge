import knex from 'knex';

import knexconfig from '../../../config/knexconfig';

const env = process.env.NODE_ENV || 'development';
const configOptions = knexconfig[env];

export default knex(configOptions);
