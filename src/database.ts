import {knex as setupKnex} from 'knex';

export const knexConfig = {
    client: 'sqlite',
    connection: {
        filename: './tmp.app.db',
    },
    useNullAsDefault: true,
}

export const knex = setupKnex(knexConfig);