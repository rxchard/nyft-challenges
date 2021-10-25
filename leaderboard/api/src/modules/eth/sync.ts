import { cconf } from '../../config'
import { ManagedWebSocketProvider } from './Provider'
import { TransferSync } from './TransferSync'

export const sync = new ManagedWebSocketProvider(TransferSync.create, 5, {
  url: cconf.provider,
})
