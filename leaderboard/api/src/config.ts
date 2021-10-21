import dotenv from 'dotenv'
import { Property, TSConvict } from 'ts-convict'

dotenv.config()

class Config {
  @Property({ default: '', env: 'ETH_CONTRACT' })
  contract!: string

  @Property({ default: [], env: 'ETH_CONTRACT_ABI' })
  contractAbi!: any[]

  @Property({ default: 'localhost', env: 'ETH_PROVIDER_URL' })
  provider!: string

  @Property({ default: false, env: 'ETH_PROVIDER_IS_WS' })
  providerWs!: boolean
}

export const cconf = new TSConvict(Config).load(
  process.env.CONFIG_DIR || './runtime.json',
)
