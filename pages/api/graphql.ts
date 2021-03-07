import { ApolloServer } from 'apollo-server-micro'
import cors from 'micro-cors'
import { schema } from '../../apollo/schema'

const apolloServer = new ApolloServer({
  schema,
})

const handler = apolloServer.createHandler({ path: '/api/graphql' })

export const config = {
  api: {
    bodyParser: false,
  },
}

export default cors({
  allowMethods: ['GET', 'POST', 'OPTIONS'],
})(handler)
