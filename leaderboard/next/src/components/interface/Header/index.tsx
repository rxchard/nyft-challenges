import React from 'react'

import { Link } from '../../Link'

export const Header: React.FC = () => {
  return (
    <div className="w-full flex flex-row justify-end p-8 bg-ndark">
      <div className="uppercase font-default text-white text-xl space-x-8">
        <Link external={true} url="https://niftyisland.com">
          Metaverse
        </Link>
        <Link url="connect">Connect Discord</Link>
      </div>
    </div>
  )
}
