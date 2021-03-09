import { AuthenticationError, UserInputError } from 'apollo-server-errors'
import knex from 'knex'
import bcrypt from 'bcryptjs'

const db = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL,
})

export const resolvers = {
  Query: {
    post: (parent, args, ctxt) =>
      db.select('*').from('posts').where({ id: args.id }).first(),
  },
  Mutation: {
    createPost: async (parent, args, ctxt) => {
      const id = String(Date.now()),
        password = Math.floor(Math.random() * 1e10).toString(16)

      await db('posts').insert({
        id,
        title: args.title ?? 'untitled',
        body: args.body,
        password: await bcrypt.hash(password, await bcrypt.genSalt()),
      })

      return {
        id,
        password,
      }
    },
    editPost: async (parent, args, ctxt) => {
      const post = await db
        .select('password')
        .from('posts')
        .where({ id: args.id })
        .first()

      if (!post) throw new UserInputError('post does not exist')

      const passwordOk = await bcrypt.compare(args.password, post.password)
      if (!passwordOk) throw new AuthenticationError('invalid password')

      const updatePostRes = await db('posts')
        .where({ id: args.id })
        .update({
          title: args.title,
          body: args.body,
        })
        .returning(['id', 'title', 'body'])

      return updatePostRes?.[0]?.id ?? null
    },
  },
}
