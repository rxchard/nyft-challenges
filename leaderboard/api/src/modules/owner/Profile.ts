import { Arg, Query, Resolver } from 'type-graphql'
import { Owner, Owners } from '../../entity/Owner'

@Resolver()
export class ProfileResolver {
  @Query(returns => Owner)
  async findOwner(@Arg('address') address: string) {
    return await Owners.findOne({ address })
  }
}
