import dotenv from 'dotenv'
import 'reflect-metadata'
import { Property, TSConvict } from 'ts-convict'

dotenv.config()

class Config {
  @Property({ default: '', env: 'ETH_CONTRACT' })
  contract!: string

  @Property({ default: [], env: 'ETH_CONTRACT_ABI' })
  contractAbi!: any[]

  @Property({ default: 'localhost', env: 'ETH_PROVIDER_URL' })
  provider!: string
}

export const cconf = new TSConvict(Config).load(
  process.env.CONFIG_DIR || './runtime.json',
)
