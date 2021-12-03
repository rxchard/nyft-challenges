import { API_BASE_URL } from '@/modules/util/constants'
import { ApolloClient, InMemoryCache } from '@apollo/client'

export * from './types'

export const client = new ApolloClient({
  uri: API_BASE_URL,
  cache: new InMemoryCache(),
})
