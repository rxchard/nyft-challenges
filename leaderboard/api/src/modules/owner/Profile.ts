import { Arg, Query, Resolver } from 'type-graphql'
import { Owner, OwnerModel } from '../../entity/Owner'

@Resolver()
export class ProfileResolver {
  @Query(returns => Owner)
  async findOwner(@Arg('address') address: string) {
    return await OwnerModel.findOne({ address })
  }
}
