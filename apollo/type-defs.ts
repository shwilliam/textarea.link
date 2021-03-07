import { gql } from 'apollo-server-micro'

export const typeDefs = gql`
  type Query {
    post(id: ID): Post!
  }

  type Post {
    id: ID!
    title: String!
    body: String
    password: String
  }
`
