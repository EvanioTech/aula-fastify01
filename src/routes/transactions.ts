import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { z } from "zod";
import { title } from "process";
import { randomUUID } from "crypto";


export async function transactionsRoutes(app: FastifyInstance) {
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