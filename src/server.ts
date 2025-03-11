import fastify from 'fastify';
import { knex } from './database';
import crypto from 'node:crypto'

const app = fastify();


app.get('/', async () => {
  const transactions = await knex('transactions').select('*');

  return transactions;
});

app.listen({port: 3000}).then(() => {
  console.log('Server is running on http://localhost:3000');
});

