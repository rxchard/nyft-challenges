import React from 'react'
import tw from 'twin.macro'
import { useTotalOwnersQuery } from '@/modules/hooks/graph'
import { useSpring } from '@react-spring/core'
import { animated } from '@react-spring/web'
import { Container, Subtitle, Title } from '../util/Base'

const BoardContainer = tw(Container)`text-center text-white uppercase`

export const Heading: React.FC = () => {
  const { data } = useTotalOwnersQuery()

  const { number } = useSpring({
    reset: true,
    from: { number: 0 },
    number: data?.totalOwners || 0,
  })

  return (
    <BoardContainer>
      <Title>Legendary Leaderboard</Title>
      {data && (
        <Subtitle>
          <animated.span>{number.to(n => Math.floor(n))}</animated.span> Palm
          Holders
        </Subtitle>
      )}
    </BoardContainer>
  )
}
