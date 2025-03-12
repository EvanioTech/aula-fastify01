import { Knex } from "knex";

declare module 'knex/types/tables' {
    interface Tables {
        transactions: {
            id: string,
            title: string,
            session_id?: string,
            amount: number,
            created_at: Date
            
        }
    }
}