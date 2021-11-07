import React from 'react'
import { Image as DavatarImage } from '@davatar/react'
import tw from 'twin.macro'
import { validateAddress } from '@/modules/util/address'

export interface AvatarProps {
  address: string
  size?: number
}

const AvatarFrame = tw.div`rounded-full`

export const Avatar: React.FC<AvatarProps> = ({ address, size = 16 }) => {
  return (
    <AvatarFrame>
      <DavatarImage
        address={
          validateAddress(address) ??
          '0x0000000000000000000000000000000000000000'
        }
        size={size}
      />
    </AvatarFrame>
  )
}
