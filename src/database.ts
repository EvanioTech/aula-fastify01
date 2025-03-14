
import  {knex as setupKnex, Knex} from 'knex';
import { env } from './env';


if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL must be set');
}

export const config: Knex.Config = {
    client: 'sqlite',
    connection: {
        filename: env.DATABASE_URL,
    },
    useNullAsDefault: true,
}

export const knex = setupKnex(config);