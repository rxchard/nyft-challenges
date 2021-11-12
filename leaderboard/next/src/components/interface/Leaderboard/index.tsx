import React, { useCallback } from 'react'
import tw from 'twin.macro'

import { useLeaderboardQuery } from '@/modules/hooks/graph'
import { OwnerList } from './OwnerList'
import { ScrollObserver } from '@/components/ScrollObserver'

const BoardFrame = tw.div`flex flex-col items-center w-full space-y-12 text-white md:w-1/2`

const Notice = tw.div`text-mandy-500 font-head`

export const Leaderboard: React.FC = () => {
  const { data, error, loading, fetchMore } = useLeaderboardQuery({
    variables: { limit: 10 },
  })

  const queryMore = useCallback(
    () =>
      fetchMore({
        variables: { skip: data?.currentLeaderboard.length ?? 0 },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prevResult

          return {
            currentLeaderboard: [
              ...prevResult.currentLeaderboard,
              ...fetchMoreResult.currentLeaderboard,
            ],
          }
        },
      }),
    [fetchMore, data],
  )

  if (error) {
    return (
      <BoardFrame>
        <Notice>{`${error.name}: ${error.message}`}</Notice>
      </BoardFrame>
    )
  }

  if (loading || !data) {
    return (
      <BoardFrame>
        <Notice>Loading...</Notice>
      </BoardFrame>
    )
  }

  return (
    <BoardFrame>
      <OwnerList list={data.currentLeaderboard} />
      {data && <ScrollObserver doIntersect={queryMore} />}
    </BoardFrame>
  )
}
