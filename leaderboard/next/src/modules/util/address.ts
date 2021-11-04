import { getAddress } from '@ethersproject/address'

export function validateAddress(address: string): string | null {
  try {
    return getAddress(address)
  } catch (err) {
    return null
  }
}

export function makeShortAddress(address: string) {
  const validated =
    validateAddress(address) ?? '0x0000000000000000000000000000000000000000'

  return `${validated.substr(0, 4 + 2)}...${validated.substr(
    validated.length - 4,
    4,
  )}`
}
