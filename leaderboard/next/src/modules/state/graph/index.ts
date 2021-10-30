import { apiBaseUrl } from '@/modules/util/constants'
import { ApolloClient, InMemoryCache } from '@apollo/client'

export * from './types'

export const client = new ApolloClient({
  uri: apiBaseUrl,
  cache: new InMemoryCache(),
})
