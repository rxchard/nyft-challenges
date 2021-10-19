import React from 'react'

import { Link } from '../util/Link'

interface HolderProps {
  address?: string
  points?: number
}

export const PalmHolder: React.FC<HolderProps> = ({
  address = '0x0000000000000000000000000000000000000000',
  points = 12,
}) => (
  <div className="w-full text-center bg-black bg-opacity-50 rounded-xl">
    <div className="flex flex-row items-center justify-between p-4 rounded-xl space-x-4 bg-ndark bg-opacity-60">
      <div className="flex flex-row items-center space-x-4">
        <div className="w-12 rounded-full overflow-hidden">
          <img src="https://i.pravatar.cc/300" alt="Avatar" />
        </div>
        <p>blackhole</p>
      </div>
      <div className="truncate text-nlight">
        <Link external={true} url={'https://etherscan.io/address/' + address}>
          {address}
        </Link>
      </div>
    </div>
    <div className="p-2">
      <p>
        This is a super interesting paragraph that is super useful. Follow me on
        twitter, @CoolGuy42060.
      </p>
    </div>
  </div>
)
