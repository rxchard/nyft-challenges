import { BigNumber } from '@ethersproject/bignumber'
import { prop, getModelForClass } from '@typegoose/typegoose'
import { BigNumberOpt } from '../store/types'

export class EventArgs {
  @prop() operator!: string
  @prop() from!: string
  @prop() to!: string

  @prop({ type: [String], ...BigNumberOpt })
  ids!: BigNumber[]

  @prop({ type: [String], ...BigNumberOpt })
  values!: BigNumber[]
}

export class Event {
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
