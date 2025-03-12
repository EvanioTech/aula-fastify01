import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { z } from "zod";
import { title } from "process";
import { randomUUID } from "crypto";


export async function transactionsRoutes(app: FastifyInstance) {


    app.get('/', async (req, rep) => {
        const transactions = await knex('transactions').select('*');
        return {
            transactions
        };
    }
    );

    app.get('/:id', async (req, rep) => {
        const getTransactionSchema = z.object({
            id: z.string().uuid(),
        });

        const {id} = getTransactionSchema.parse(req.params);

        const [transaction] = await knex('transactions').select('*').where({id});

        return {
            transaction
        };
    }
    );

    app.get('/sumary', async (req, rep) => {
        const [sumary] = await knex('transactions').sum('amount as total')
        return {
            sumary
        };
    }
    );


    app.post('/', async (req, rep) => {
     
        const createTransactionSchema = z.object({
            amount: z.number(),
            title: z.string(),
            type: z.enum(['credit', 'debit']),
    });

    const {title, amount, type } = createTransactionSchema.parse(
        req.body
    );

    await knex('transactions').insert({
        id: randomUUID(),
        title,
        amount: type === 'credit' ? amount : -amount,
    });

    return rep.status(201).send();
    }
    );

    

    
}