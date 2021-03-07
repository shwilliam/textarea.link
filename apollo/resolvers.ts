import knex from 'knex'

const db = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL,
})

export const resolvers = {
  Query: {
    post: (parent, args, ctxt) =>
      db.select('*').from('posts').where({ id: args.id }).first(),
  },
}
