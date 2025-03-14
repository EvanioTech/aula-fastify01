import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { z } from "zod";
import { title } from "process";
import { randomUUID } from "crypto";
import { checkSessionIdExists } from "../middleware/check-session-id-exists";


export async function transactionsRoutes(app: FastifyInstance) {


    app.get('/', { preHandler: [checkSessionIdExists], },
         async (req, rep) => {
        const {sessionId} = req.cookies;

        const transactions = await knex('transactions')
        .where('session_id', sessionId)
        .select()

        return {
            transactions
        };
    }
    );

    app.get('/:id',{ preHandler: [checkSessionIdExists], }, async (req, rep) => {
        const getTransactionSchema = z.object({
            id: z.string().uuid(),
        });

        const {id} = getTransactionSchema.parse(req.params);

        const {sessionId} = req.cookies;

        const [transaction] = await knex('transactions')
        .where(
            {
                id,
                session_id: sessionId
            }
        )

        return {
            transaction
        };
    }
    );

    app.get('/sumary',{ preHandler: [checkSessionIdExists], }, async (req, rep) => {

        const {sessionId} = req.cookies;

        const sumary = await knex('transactions')
        .where('session_id', sessionId)
        .sum('amount',{as: 'amount'} )
        .first();
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

    let sessionId = req.cookies.sessionId;

    if (!sessionId) {
        sessionId = randomUUID();
        rep.cookie('sessionId', sessionId, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });
    }

    await knex('transactions').insert({
        id: randomUUID(),
        title,
        amount: type === 'credit' ? amount : -amount,
        session_id: sessionId,
    });

    return rep.status(201).send();
    }
    );

    

    
}