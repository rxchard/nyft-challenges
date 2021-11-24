import { Arg, Query, Resolver } from 'type-graphql'
import { accessOwner, OwnerEntry } from './util'

@Resolver()
export class OwnerResolver {
  @Query(() => OwnerEntry)
  async findOwner(@Arg('address') address: string): Promise<OwnerEntry> {
    return accessOwner(address)
  }
}
