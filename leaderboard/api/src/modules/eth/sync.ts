import { ethers } from 'ethers'

import { cconf } from '../../config'
import { Events } from '../../entity/Event'
import { warn, info } from '../../winston'
import { indexTransfer } from './indexer'
import { ManagedWebSocketProvider } from './provider'

async function syncFrom(
  contract: ethers.Contract,
  fromBlock?: number,
): Promise<number> {
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

  let indexed = 0
  for (const event of events) (await indexTransfer(event)) ? indexed++ : 0

  return indexed
}

async function syncBlocks(contract: ethers.Contract) {
  const bestEvent = (await Events.find().sort({ blockNumber: -1 }).limit(1))[0]
  const bestBlock = bestEvent ? bestEvent.blockNumber + 1 : 0

  bestEvent
    ? info('sync: from block ' + bestBlock)
    : warn('sync: assuming initial')

  info(`sync: indexed ${await syncFrom(contract, bestBlock)} events`)
}

function syncEvents(contract: ethers.Contract) {
  contract.on(contract.filters.TransferSingle(), event => {
    console.log(event)
  })

  info('sync: listening to contract events')
}

export const sync = new ManagedWebSocketProvider(
  async (provider: ethers.providers.WebSocketProvider) => {
    const contract = new ethers.Contract(
      cconf.contract,
      cconf.contractAbi,
      provider,
    )

    // Sync from best block -> compensate for downtime
    await syncBlocks(contract)
    syncEvents(contract)

    // provider.on('block', console.log)
  },
  5,
  { url: cconf.provider },
)
