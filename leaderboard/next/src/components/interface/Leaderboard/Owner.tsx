import React from 'react'
import tw from 'twin.macro'

import { Link } from '@/components/Link'

export interface OwnerProps {
  address?: string
  points?: number
}

const OwnerFrame = tw.div`w-full mt-8 text-lg text-center text-white bg-mandy-500 rounded-xl ring ring-nlight`

const OwnerText = tw.p`p-2 text-mandy-100`

export const Owner: React.FC<OwnerProps> = ({
  address = '0x0000000000000000000000000000000000000000',
  points = 12,
}) => (
  <OwnerFrame>
    <div className="flex flex-row items-center justify-between p-4 space-x-4 rounded-xl bg-darked-800">
      <div className="flex flex-row items-center space-x-4">
        <div className="w-12 overflow-hidden rounded-full">
          <img src="https://i.pravatar.cc/300" alt="Avatar" />
        </div>
        <p className="text-white">Something</p>
      </div>
      <div className="truncate">
        <Link external={true} url={'https://etherscan.io/address/' + address}>
          {address}
        </Link>
      </div>
    </div>
    <OwnerText>
      This is a super interesting paragraph that is super useful. Follow me on
      twitter, @CoolGuy42060.
    </OwnerText>
  </OwnerFrame>
)
