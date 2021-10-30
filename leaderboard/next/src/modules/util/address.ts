import { getAddress } from '@ethersproject/address'

export function validateAddress(address: string) {
  return getAddress(address)
}

export function makeShortAddress(address: string) {
  const validated = validateAddress(address)

  return `${validated.substr(0, 4 + 2)}...${validated.substr(
    validated.length - 4,
    4,
  )}`
}
