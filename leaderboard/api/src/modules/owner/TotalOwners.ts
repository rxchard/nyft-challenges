import { Int, Query, Resolver } from 'type-graphql'
import { Owners } from '../../entity/Owner'

@Resolver()
export class TotalOwnersResolver {
  @Query(() => Int)
  async totalOwners(): Promise<number> {
    return Owners.find({ valuation: { $gt: 0 } }).count()
  }
}
