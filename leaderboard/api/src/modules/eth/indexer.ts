import { ethers } from 'ethers'
import { BigNumber } from '@ethersproject/bignumber'

import { EventArgs, Events } from '../../entity/Event'
import { Balance, Owners } from '../../entity/Owner'
import { warn } from '../../winston'

// this can be improved substantially. (e.g. by using a map)
//
function applyValues(bal: Balance, key: BigNumber, value: BigNumber) {
  const val = value.toNumber()

  switch (key.toNumber()) {
    case 0:
      bal.iron += val
      break
    case 1:
      bal.bronze += val
      break
    case 2:
      bal.silver += val
      break
    case 3:
      bal.gold += val
      break
    case 4:
      bal.neon += val
      break
    case 5:
      bal.ultra += val
      break
    default:
      warn('unknown token id: ' + key.toHexString())
      break
  }
}

export async function indexOwner(args: EventArgs): Promise<boolean> {
  const BLACK_HOLE = '0x0000000000000000000000000000000000000000'

  // from
  if (args.from !== BLACK_HOLE) {
    const from =
      (await Owners.findOne({ address: args.from })) ||
      (await Owners.create({
        address: args.from,
        balance: { iron: 0, bronze: 0, silver: 0, gold: 0, neon: 0, ultra: 0 },
      }))

    // note: negate values by mul
    args.ids.forEach((k, i) =>
      applyValues(from.balance, k, args.values[i].mul(-1)),
    )

    await from.save()
  }

  // to
  if (args.to !== BLACK_HOLE) {
    const to =
      (await Owners.findOne({ address: args.to })) ||
      (await Owners.create({
        address: args.to,
        balance: { iron: 0, bronze: 0, silver: 0, gold: 0, neon: 0, ultra: 0 },
      }))

    args.ids.forEach((k, i) => applyValues(to.balance, k, args.values[i]))

    await to.save()
  }

  return true
}

export async function indexTransfer(event: ethers.Event): Promise<boolean> {
  if (await Events.findOne({ transactionHash: event.transactionHash }))
    return false

  if (!event.args) {
    warn(`sync: arguments not found for ${event.transactionHash}.`)
    return false
  }

  const el = await Events.create({
    ...event,
    args: {
      ...event.args,
      ids: event.args.id || event.args.ids,
      // Note: for TransferBatch events, the ABI input name needs to be changed
      // from "values" to "_values" because array.values is reserved and ethers.js doesn't handle this properly
      values: event.args.value || event.args._values,
    },
  })

  return el && (await indexOwner(el.args))
}
