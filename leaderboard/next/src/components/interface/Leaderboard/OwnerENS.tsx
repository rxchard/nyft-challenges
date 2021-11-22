import React from 'react'
import { useENS } from '@/modules/hooks/web3'
import { Owner, OwnerProps } from './Owner'

export const OwnerENS: React.FC<OwnerProps> = ({ address, name, ...props }) => {
  const { name: ensName } = useENS(address)

  return <Owner {...props} name={name || ensName} address={address} />
}
