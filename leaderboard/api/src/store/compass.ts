import mongoose from 'mongoose'
import { error, info } from '../winston'

export async function connect(): Promise<void> {
  if (mongoose.connection.readyState == 1) return

  {
    const con = mongoose.connection

    con.once('connected', () => info('mongodb connected'))
    con.on('reconnected', () => info('mongodb reconnected'))

    con.on('disconnected', () => info('mongodb disconnected'))

    con.on('error', error)
  }

  await mongoose.connect('mongodb://localhost:27017/', {
    retryWrites: true,
    w: 'majority',
    dbName: 'leaderboard',
  })
}
