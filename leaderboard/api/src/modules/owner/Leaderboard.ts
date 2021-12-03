import { Args, Query, Resolver, ArgsType, Field, Int } from 'type-graphql'
import { Owner, Owners } from '../../entity/Owner'
import { Pagination } from '../graph/Pagination'

@Resolver()
export class LeaderboardResolver {
  @Query(() => [Owner])
  async currentLeaderboard(
    @Args() { limit, skip }: Pagination,
  ): Promise<Owner[]> {
    return await Owners.findActive()
      .sort({ valuation: -1, _id: -1 })
      .skip(skip)
      .limit(limit)
  }
}
