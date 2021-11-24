import { BigNumber } from '@ethersproject/bignumber'
import { BasePropOptions } from '@typegoose/typegoose/lib/types'

// Could add custom schema type but this will suffice.
// Saves as hex string, gets as BigNumber
//
export const BigNumberOpt: BasePropOptions = {
  get: (v: any) => {
    if (typeof v === 'undefined') return null
    // input = [0, 1], 0, 1, ...
    if (Array.isArray(v)) return v.map(item => BigNumber.from(item))

    return BigNumber.from(v)
  },
  set: (v: any) => {
    if (v instanceof BigNumber) return v.toHexString()
    // input = [{"type":"BigNumber","hex":"0x01"},{"type":"BigNumber","hex":"0x0539"}]
    if (Array.isArray(v)) return v.map(item => item.toHexString())

    return BigNumber.from(v).toHexString()
  },
}
