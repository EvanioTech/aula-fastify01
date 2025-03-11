import 'dotenv/config';

import { z } from 'zod';

const envSchema = z.object({
    DATABASE_URL: z.string(),
    PORT: z.number().default(3000),
    
});

 const _env = envSchema.safeParse(process.env);

if (!_env.success) {
    console.error
    throw new Error(_env.error.errors.map(e => e.message).join('\n'));
}

export const env = _env.data;