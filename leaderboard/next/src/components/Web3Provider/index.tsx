import React from 'react'
import { Web3ReactProvider } from '@web3-react/core'
import { getLibrary } from '@/modules/util/library'
import { useEagerConnect } from '@/modules/hooks/web3'

function Web3ReactManager() {
  useEagerConnect()
  return null
}

export const Web3Provider: React.FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ReactManager />
      {children}
    </Web3ReactProvider>
  )
}
