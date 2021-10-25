import WebSocket from 'ws'
import { debug } from '../winston'

const PING_TIMEOUT = 1000 * 5
const CHECK_INTERVAL = 1000 * 10

export function isSocketAlive(socket: WebSocket) {
  return (
    socket.readyState === WebSocket.CONNECTING ||
    socket.readyState === WebSocket.OPEN
  )
}

export function checkSocket(socket: WebSocket) {
  if (!isSocketAlive(socket)) return

  // const tm = setTimeout(
  //   () => !isSocketAlive(socket) && socket.close(4000),
  //   PING_TIMEOUT,
  // )
  const tm = setTimeout(() => {
    if (!isSocketAlive(socket)) return

    debug('stale')
    socket.close(4000)
  }, PING_TIMEOUT)

  socket.once('pong', () => clearTimeout(tm))
  socket.ping()
}

export function activeCheckSocket(socket: WebSocket) {
  if (!isSocketAlive(socket)) return

  checkSocket(socket)
  setTimeout(() => activeCheckSocket(socket), CHECK_INTERVAL)
}
