import { useMemo } from 'react'
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'

let apolloClient: ApolloClient<NormalizedCacheObject>

const createIsomorphicLink = () => {
  if (typeof window === 'undefined') {
    const { SchemaLink } = require('@apollo/client/link/schema')
    const { schema } = require('./schema')
    return new SchemaLink({ schema })
  } else {
    const { HttpLink } = require('@apollo/client/link/http')
    return new HttpLink({
      uri: '/api/graphql',
    })
  }
}

const createApolloClient = () =>
  new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createIsomorphicLink(),
    cache: new InMemoryCache(),
  })

export const initApollo = (initialState = null) => {
  const client = apolloClient ?? createApolloClient()

  if (initialState) {
    client.cache.restore(initialState)
  }

  if (typeof window === 'undefined') return client
  apolloClient = apolloClient ?? client

  return apolloClient
}

export const useApollo = initialState => {
  const store = useMemo(() => initApollo(initialState), [initialState])
  return store
}
