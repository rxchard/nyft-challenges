import { BigNumber } from '@ethersproject/bignumber'
import { prop, getModelForClass } from '@typegoose/typegoose'
import { BasePropOptions } from '@typegoose/typegoose/lib/types'

// Could add custom schema type but this will suffice.
// Saves as hex string, gets as BigNumber
//
const BigNumberOpt: BasePropOptions = {
  get: (v: any) => {
    if (typeof v === 'undefined') return null
    return BigNumber.from(v)
  },
  set: (v: any) => {
    if (v instanceof BigNumber) return v.toHexString()
    return BigNumber.from(v).toHexString()
  },
}

class EventArgs {
  @prop() operator!: string
  @prop() from!: string
  @prop() to!: string

  @prop({ type: [String], ...BigNumberOpt })
  ids!: BigNumber[]

  @prop({ type: [String], ...BigNumberOpt })
  values!: BigNumber[]
}

class Event {
  @prop() event!: string

  @prop() blockNumber!: number
  @prop() blockHash!: string
  @prop() data!: string

  @prop({ type: [String] })
  topics!: string[]

  @prop() transactionHash!: string

  @prop({ type: EventArgs, _id: false })
  args!: EventArgs
}

export const Events = getModelForClass(Event)
