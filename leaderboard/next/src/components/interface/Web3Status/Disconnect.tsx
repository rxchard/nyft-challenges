import React from 'react'
import { LogOut } from 'react-feather'
import tw from 'twin.macro'
import { useEthersWeb3React } from '@/modules/hooks/web3'

const DisconnectIcon = tw(LogOut)`cursor-pointer`

export const Web3Disconnect: React.FC = props => {
  const { active, deactivate } = useEthersWeb3React()
  return active ? <DisconnectIcon {...props} onClick={deactivate} /> : null
}
