import { gql } from 'apollo-server-micro'

export const typeDefs = gql`
  type Query {
    post(id: ID): Post!
  }

  type Mutation {
    createPost(title: String, body: String): CreatePostRes
    editPost(id: ID!, title: String, body: String, password: String!): ID
  }

  type Post {
    id: ID!
    title: String!
    body: String
    password: String
  }

  type CreatePostRes {
    id: ID!
    password: String!
  }
`
