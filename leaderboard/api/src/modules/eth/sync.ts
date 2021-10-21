import { ethers } from 'ethers'

import { cconf } from '../../config'
import { Events } from '../../entity/Event'
import { warn, info } from '../../winston'

const provider = cconf.providerWs
  ? new ethers.providers.WebSocketProvider(cconf.provider)
  : new ethers.providers.JsonRpcProvider(cconf.provider)

const contract = new ethers.Contract(
  cconf.contract,
  cconf.contractAbi,
  provider,
)

async function indexSingle(event: ethers.Event): Promise<boolean> {
  if (!event.args) {
    warn(`sync: arguments not found for ${event.transactionHash}.`)
    return false
  }

  if (await Events.findOne({ transactionHash: event.transactionHash }))
    return false

  return (
    (await Events.create({
      ...event,
      args: {
        ...event.args,
        ids: event.args.id || event.args.ids,
        values: event.args.value || event.args._values,
      },
    })) != null
  )
}

async function indexEvents(fromBlock?: number): Promise<number> {
  // TransferSingle & TransferBatch
  const events = [
    ...(await contract.queryFilter(
      contract.filters.TransferSingle(),
      fromBlock,
    )),
    ...(await contract.queryFilter(
      contract.filters.TransferBatch(),
      fromBlock,
    )),
  ]

  const indexed = await Promise.all(events.map(async e => await indexSingle(e)))
  return indexed.filter(e => e).length
}

// TODO: subscriptions
export async function synchronize() {
  const bestEvent = (await Events.find().sort({ blockNumber: -1 }).limit(1))[0]

  if (!bestEvent) warn('assuming initial sync')
  else info('sync from block ' + (bestEvent.blockNumber + 1))

  const total = await indexEvents(bestEvent ? bestEvent.blockNumber + 1 : 0)
  info(`synced ${total} events`)

  contract.on(contract.filters.TransferSingle(), event => {
    console.log(event)
  })
}
