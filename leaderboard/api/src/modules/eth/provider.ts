import { providers } from 'ethers'

import WebSocket from 'ws'
import { debug, error, info, warn } from '../../winston'

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

  private listenStale(socket: WebSocket) {
    const closed = () =>
      socket.readyState === WebSocket.CLOSING ||
      socket.readyState === WebSocket.CLOSED

    if (closed()) return

    const cb = setTimeout(() => {
      if (closed()) return

      debug('websocket closing due to stale connection')
      socket.close(4000)
    }, 5 * 1000)

    socket.once('pong', () => clearTimeout(cb))
    socket.ping()

    setTimeout(() => this.listenStale(socket), 10 * 1000)
  }

  private listenClose(provider: providers.WebSocketProvider) {
    const socket: WebSocket = provider._websocket

    socket.on('error', error)

    socket.on('open', () => {
      debug('websocket connected')
      this.listenStale(socket)
    })

    socket.once('close', code => {
      debug('websocket closed: ' + code)
      // Ignore NORMAL_CLOSURE
      if (code === 1000) return

      provider.removeAllListeners()
      // set timeout here so we don't end up spamming the endpoint
      setTimeout(() => this.restart(), 1000)
    })
  }

  public restart() {
    // clearing here because this is public
    if (this.restartTimer) clearTimeout(this.restartTimer)

    if (this.retries === this.maxRetries) {
      console.log(this.retries)
      warn('provider: could not restart: ran out of retries')
      return
    }

    info(`provider restarting: chance ${++this.retries}/${this.maxRetries}`)

    this.restartTimer = setTimeout(() => (this.retries = 0), 30 * 1000)
    this.start()
  }
}
