import { DocumentType } from '@typegoose/typegoose'
import { Field, Int, ObjectType } from 'type-graphql'
import { Owner, Owners } from '../../entity/Owner'

@ObjectType()
export class OwnerEntry {
  @Field(() => Owner, { nullable: true })
  owner?: DocumentType<Owner>

  @Field(() => Int)
  idx!: number

  @Field()
  updateAllowed!: boolean
}

export async function accessOwner(search: string): Promise<OwnerEntry> {
  const sortedOwners = await Owners.findActive().sort({
    valuation: -1,
    _id: -1,
  })

  const idx = sortedOwners.findIndex(
    ({ address }) => address.toLowerCase() === search.toLowerCase(),
  )

  const owner = sortedOwners.at(idx)

  return {
    owner,
    idx,
    updateAllowed: idx >= 0 && idx <= 30,
  }
}
