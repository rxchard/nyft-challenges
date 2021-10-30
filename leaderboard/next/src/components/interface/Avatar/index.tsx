import React from 'react'
import { Image as DavatarImage } from '@davatar/react'
import tw from 'twin.macro'

export interface AvatarProps {
  address: string
  size?: number
}

const AvatarFrame = tw.div`rounded-full ring-2 ring-mandy-400`

export const Avatar: React.FC<AvatarProps> = ({ address, size = 16 }) => {
  return (
    <AvatarFrame>
      <DavatarImage address={address} size={size} />
    </AvatarFrame>
  )
}
