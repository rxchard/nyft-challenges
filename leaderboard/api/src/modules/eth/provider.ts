import { providers } from 'ethers'

import { WebSocket } from 'ws'
import { debug, info, warn } from '../../winston'

type SetupListener = (provider: providers.WebSocketProvider) => Promise<void>

interface SetupOptions {
  url: string
  network?: providers.Networkish
}

export class ManagedWebSocketProvider {
  private maxRetries: number
  private retries: number

  private setup: SetupListener
  private options: SetupOptions

  private restartTimer?: NodeJS.Timeout

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

    this.listenClose(provider)
    await this.setup(provider)
  }

  private listenClose(provider: providers.WebSocketProvider) {
    const wsock: WebSocket = provider._websocket

    wsock.on('close', code => {
      debug('provider: socket close with code ' + code)
      // Ignore NORMAL_CLOSURE
      if (code === 1000) return

      provider.removeAllListeners()
      this.restart()
    })
  }

  public restart() {
    // clearing here because this is public
    if (this.restartTimer) clearTimeout(this.restartTimer)

    if (this.retries === this.maxRetries) {
      warn('provider: could not restart: ran out of retries')
      return
    }

    info(`provider restarting: chance ${this.retries++}/${this.maxRetries}`)

    this.restartTimer = setTimeout(() => (this.retries = 0), 10 * 1000)
    this.start()
  }
}
