import React from 'react'
import { useTrail, animated } from 'react-spring'
import { LeaderboardQuery } from '@/modules/hooks/graph'
import { Owner } from './Owner'

const AnimatedOwner = animated(Owner)

export interface OwnerListProps {
  list: LeaderboardQuery['currentLeaderboard']
}

export const OwnerList: React.FC<OwnerListProps> = ({ list }) => {
  const trail = useTrail(list.length, {
    opacity: 1,
    from: { opacity: 0 },
  })

  return (
    <>
      {trail.map((styles, index) => {
        const { address, valuation, details } = list[index]

        return (
          <AnimatedOwner
            {...{
              address,
              valuation,
              name: details?.name ?? undefined,
              text: details?.text ?? undefined,
            }}
            key={index}
            style={styles}
          />
        )
      })}
    </>
  )
}
