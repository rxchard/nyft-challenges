import { providers } from 'ethers'

import { WebSocket } from 'ws'
import { debug, warn } from '../../winston'

type SetupListener = (provider: providers.WebSocketProvider) => Promise<void>

interface SetupOptions {
  url: string
  network?: providers.Networkish
}

export class ManagedWebSocketProvider {
  private maxRetries: number
  private retries: number
  //
  private setup: SetupListener
  private options: SetupOptions

  constructor(setup: SetupListener, maxRetries: number, options: SetupOptions) {
    this.setup = setup

    this.maxRetries = maxRetries
    this.retries = 0
    this.options = options
  }

  public async start() {
    const provider = new providers.WebSocketProvider(
      this.options.url,
      this.options.network,
    )

    // try to restart if the websocket dies
    ;(provider._websocket as WebSocket).on('close', code => {
      provider.removeAllListeners()
      this.restart(code)
    })

    // call setup which exposes our internal provider
    await this.setup(provider)
  }

  private restart(code: number) {
    debug('provider: socket close with code' + code)
    if (code === 1000) return

    if (this.retries < this.maxRetries) {
      this.retries++

      debug(`provider restarting: chance ${this.retries}/${this.maxRetries}`)
      this.start()
      return
    }

    warn('provider: could not restart: ran out of retries')
  }
}
