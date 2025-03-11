import fastify from 'fastify';
import { knex } from './database';
import crypto from 'node:crypto'
import { env } from './env';

const app = fastify();


app.get('/', async () => {
  const transactions = await knex('transactions').select('*');

  return transactions;
});

app.listen({port: env.PORT}).then(() => {
  console.log('Server is running on http://localhost:3000');
});

