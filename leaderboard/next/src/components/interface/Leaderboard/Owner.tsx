import React from 'react'
import tw from 'twin.macro'

import { Link } from '@/components/Link'
import { Avatar } from '../Avatar'
import { BarChart2 } from 'react-feather'

export interface OwnerProps {
  address: string
  valuation: number
  name?: string | null
  text?: string | null
}

const OwnerFrame = tw.div`w-full mt-8 text-lg text-center text-white bg-clip-padding bg-gradient-to-r from-primary-4 via-primary-5 to-primary-6 rounded-xl ring-2 ring-secondary-700`

const DetailFrame = tw.div`flex flex-row items-center justify-between p-4 space-x-4 bg-black bg-clip-padding bg-opacity-90 rounded-xl`

const NamedAvatar = tw.div`flex flex-row items-center max-w-full space-x-4 overflow-hidden`
const TruncLink = tw(Link)`truncate`

const Description = tw.p`p-4 pt-2 pb-2 text-white break-words`

const Valuation = tw.p`space-x-2 whitespace-nowrap`
const ValueIcon = tw(BarChart2)`inline-block w-4 h-4 text-white`

const PalmContainer = tw.div`flex flex-row items-center space-x-2 rounded-xl`
const PalmImage = tw.img`w-8 p-1 rounded-full bg-gradient-to-r from-primary-4 to-primary-5`

export const Owner: React.FC<OwnerProps> = ({
  address,
  valuation,
  name,
  text,
  ...rest
}) => (
  <OwnerFrame {...rest}>
    <DetailFrame>
      <NamedAvatar>
        <Avatar address={address} size={42} />
        <div tw="text-left">
          <TruncLink
            external={true}
            url={'https://etherscan.io/address/' + address}
          >
            {name || address}
          </TruncLink>
          {/* <PalmContainer>
            <PalmImage src="/ultra.png" alt="" />
            <PalmImage src="/neon.png" alt="" />
            <PalmImage src="/silver.png" alt="" />
            <PalmImage src="/iron.png" alt="" />
          </PalmContainer> */}
        </div>
      </NamedAvatar>
      <Valuation>
        <span>{valuation}</span>
        <ValueIcon />
      </Valuation>
    </DetailFrame>
    {text ? <Description>{text}</Description> : null}
  </OwnerFrame>
)
