import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  split,
} from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { setContext } from 'apollo-link-context'
import { createClient } from 'graphql-ws'
import { getMainDefinition } from '@apollo/client/utilities'

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    },
  }
})
const httplink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
})

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:4000/graphql',
    // connectionParams: {
    //   authentication: user.authToken,
    // },
    options: {
      reconnect: true,
    },
  })
)
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  authLink.concat(httplink)
)
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,

  document.getElementById('root')
)
