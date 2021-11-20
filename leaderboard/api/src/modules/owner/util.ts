import { Owners } from '../../entity/Owner'

export async function findOwnerIndex(address: string): Promise<number | null> {
  const sorted = await Owners.find().sort({ valuation: -1 })
  const idx = sorted.findIndex(owner => owner.address === address)

  return idx === -1 ? null : idx + 1
}

export async function mayUpdateDetails(address: string): Promise<boolean> {
  const idx = await findOwnerIndex(address)
  return idx ? idx >= 30 : false
}
