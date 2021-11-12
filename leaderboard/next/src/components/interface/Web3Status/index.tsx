import React, { useEffect } from 'react'
import { useEthersWeb3React } from '@/modules/hooks/web3'
import { useFindRankLazyQuery } from '@/modules/hooks/graph'
import { Web3StatusBase } from './Status'
import { injected } from '@/modules/util/connectors'

export const Web3Status: React.FC = () => {
  const { account, error, activate } = useEthersWeb3React()
  const [queryFindRank, { data }] = useFindRankLazyQuery()

  useEffect(() => {
    if (!account) return
    queryFindRank({ variables: { address: account } })
  }, [queryFindRank, account])

  return (
    <Web3StatusBase
      address={account}
      rank={data?.findRank}
      error={error}
      onAcivate={() => activate(injected)}
    />
  )
}
