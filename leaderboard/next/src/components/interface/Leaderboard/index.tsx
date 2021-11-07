import { useLeaderboardQuery } from '@/modules/hooks/graph'
import React from 'react'
import tw from 'twin.macro'
import { Owner } from './Owner'

const LeaderboardFrame = tw.div`flex flex-col w-full space-y-12 text-white md:w-1/2`

export const Leaderboard: React.FC = () => {
  const { data, error } = useLeaderboardQuery({ variables: { limit: 10 } })

  if (!data || error) {
    return <LeaderboardFrame>Error</LeaderboardFrame>
  }

  return (
    <LeaderboardFrame>
      {data.currentLeaderboard.map(({ address, valuation, details }, i) => (
        <Owner
          {...{ address, valuation, name: details?.name, text: details?.text }}
          key={i}
        />
      ))}
    </LeaderboardFrame>
  )
}
