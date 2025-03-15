import { Knex } from 'knex'

const config: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: './database.sqlite',
  },
  useNullAsDefault: true, // Adicione essa linha se não estiver presente
  migrations: {
    directory: './migrations',
  },
}

export default config
