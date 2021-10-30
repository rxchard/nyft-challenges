import React from 'react'
import { Web3ReactProvider } from '@web3-react/core'
import { getLibrary } from '../../modules/util/library'

export const Web3Provider: React.FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>{children}</Web3ReactProvider>
  )
}
