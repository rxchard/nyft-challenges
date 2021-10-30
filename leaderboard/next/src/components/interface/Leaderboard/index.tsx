import React from 'react'
import tw from 'twin.macro'
import { Owner } from './Owner'

const LeaderboardFrame = tw.div`flex flex-col w-full space-y-12 md:w-1/2`

export const Leaderboard: React.FC = () => {
  return (
    <LeaderboardFrame>
      <Owner />
      <Owner />
      <Owner />
      <Owner />
    </LeaderboardFrame>
  )
}
