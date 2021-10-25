import { ethers } from 'ethers'
import { cconf } from '../../config'
import { Events } from '../../entity/Event'
import { info, warn } from '../../winston'
import { indexTransfer } from './indexer'
import { Provider } from './Provider'

// https://docs.ethers.io/v5/api/providers/provider/#Provider--ens-methods

export class TransferSync {
  private provider: Provider
  private contract: ethers.Contract

  constructor(provider: Provider) {
    this.provider = provider
    this.contract = new ethers.Contract(
      cconf.contract,
      cconf.contractAbi,
      provider,
    )
  }

  public static async create(provider: Provider): Promise<TransferSync> {
    const clazz = new TransferSync(provider)

    await clazz.blocks()
    clazz.events()

    return clazz
  }

  public async from(fromBlock?: number): Promise<number> {
    // TransferSingle & TransferBatch
    const events = [
      ...(await this.contract.queryFilter(
        this.contract.filters.TransferSingle(),
        fromBlock,
      )),
      ...(await this.contract.queryFilter(
        this.contract.filters.TransferBatch(),
        fromBlock,
      )),
    ]

    let indexed = 0
    for (const event of events) (await indexTransfer(event)) ? indexed++ : 0
    return indexed
  }

  public async blocks() {
    const bestEvent = (
      await Events.find().sort({ blockNumber: -1 }).limit(1)
    )[0]
    const bestBlock = bestEvent ? bestEvent.blockNumber + 1 : 0

    bestEvent
      ? info('sync: from block ' + bestBlock)
      : warn('sync: assuming initial')

    info(`sync: indexed ${await this.from(bestBlock)} events`)
  }

  public events() {
    info('sync: listen to contract events')

    const index = async (...args: any[]) => {
      // if (args.length === 0) return

      const event: ethers.Event = args[args.length - 1]
      console.log(event)

      const indexed = await indexTransfer(event)
      indexed
        ? info(`sync: indexed ${event.event}, ${event.transactionHash}`)
        : warn(`sync: failed to index ${event.event}, ${event.transactionHash}`)
    }

    this.contract.on(this.contract.filters.TransferSingle(), index)
    this.contract.on(this.contract.filters.TransferBatch(), index)
  }
}
