import { Args, Query, Resolver } from 'type-graphql'
import { Owner, Owners } from '../../entity/Owner'
import { Pagination } from '../../types/Pagination'

@Resolver()
export class LeaderboardResolver {
  @Query(() => [Owner])
  async currentLeaderboard(@Args() { limit, skip }: Pagination) {
    return await Owners.find()
      .sort({ valuation: -1, _id: -1 })
      .skip(skip)
      .limit(limit)
  }
}
