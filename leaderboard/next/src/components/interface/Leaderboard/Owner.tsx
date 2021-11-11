import React from 'react'
import tw from 'twin.macro'

import { Link } from '@/components/Link'
import { Avatar } from '../Avatar'
import { makeShortAddress } from '@/modules/util/address'
import { BarChart2 } from 'react-feather'

export interface OwnerProps {
  address?: string
  valuation?: number
  name?: string
  text?: string
}

const OwnerFrame = tw.div`w-full mt-8 text-lg text-center text-white border bg-mandy-500 rounded-xl border-mandy-500`

const DetailFrame = tw.div`flex flex-row items-center justify-between p-4 space-x-4 rounded-xl bg-darked-800`

const NamedAvatar = tw.div`flex flex-row items-center space-x-4`

const Description = tw.p`p-2 text-mandy-100`

const Valuation = tw.p`space-x-2`
const ValueIcon = tw(BarChart2)`inline-block w-4 h-4 text-white`

export const Owner: React.FC<OwnerProps> = ({
  address = '0x0000000000000000000000000000000000000000',
  valuation = -1,
  name,
  text,
  ...rest
}) => (
  <OwnerFrame {...rest}>
    <DetailFrame>
      <NamedAvatar>
        <Avatar address={address} size={42} />
        <Link external={true} url={'https://etherscan.io/address/' + address}>
          {name ? name : makeShortAddress(address)}
        </Link>
      </NamedAvatar>
      <Valuation>
        <span>{valuation}</span>
        <ValueIcon />
      </Valuation>
    </DetailFrame>
    {text ? <Description>{text}</Description> : null}
  </OwnerFrame>
)
