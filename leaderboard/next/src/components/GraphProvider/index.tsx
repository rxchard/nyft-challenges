import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { client } from '@/modules/state/graph'

export const GraphProvider: React.FC = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
