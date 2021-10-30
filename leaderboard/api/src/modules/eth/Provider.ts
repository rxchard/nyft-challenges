import { providers } from 'ethers'
import WebSocket from 'ws'

import { debug, error, info, warn } from '../../winston'
import { activeCheckSocket } from '../../util/wsutil'

export type Provider = providers.WebSocketProvider
export const Provider = providers.WebSocketProvider

export type SetupListener = (
  provider: providers.WebSocketProvider,
) => Promise<any>

export interface SetupOptions {
  url: string
  network?: providers.Networkish
}

const RESTART_DELAY = 1000 * 5
const RESET_TIMEOUT = 1000 * 30

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
    const provider = new Provider(this.options.url, this.options.network)

    this.listenEvents(provider)
    await this.setup(provider)
  }

  private listenEvents(provider: Provider) {
    const socket: WebSocket = provider._websocket

    socket.on('error', error)

    socket.on('open', () => {
      debug('websocket connected')
      activeCheckSocket(socket)
    })

    socket.once('close', code => {
      debug('websocket closed: ' + code)
      // Ignore NORMAL_CLOSURE
      if (code === 1000) return

      provider.removeAllListeners()
      // set timeout here so we don't end up spamming the endpoint
      setTimeout(() => this.restart(), RESTART_DELAY)
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

    this.restartTimer = setTimeout(() => (this.retries = 0), RESET_TIMEOUT)
    this.start()
  }
}
