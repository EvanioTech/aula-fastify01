import {expect, it, beforeAll, describe, afterAll, beforeEach} from 'vitest'
import request from 'supertest'
import {app} from '../src/app'

import { execSync } from 'node:child_process'

describe('Testando rotas de transações', () => {


beforeAll(async () => {
  console.log('Iniciando aplicação...')
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

beforeEach(async () => {
  console.log('Resetando banco de dados...')
  execSync('npm run knex migrate:rollback --all')
  execSync('npm run knex migrate:latest')
})



it('o usuário pode criar uma transação', async () => {
    await request(app.server)
    .post('/transactions')
    .send({
      title: 'New transaction',
      type: 'credit',
      amount: 5000,
    })
    .expect(201)

  })
})


it('lista de transações', async () => {
  const createTransactionResponse = await request(app.server)
   .post('/transactions')
   .send({
     title: 'New transaction',
     amount: 5000,
     type: 'credit',
   })
 
   const cookies = createTransactionResponse.headers['set-cookie']
 
 
   const listTransactionsResponse = await request(app.server)
   .get('/transactions')
   .set('Cookie', cookies)
   .expect(200)
 
   expect(listTransactionsResponse.body.transactions).toEqual([
     expect.objectContaining({
       title: 'new transaction',
       amount: 5000,
     })
   ])
 
 });

  
