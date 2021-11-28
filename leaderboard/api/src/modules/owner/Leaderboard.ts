import { Args, Query, Resolver, ArgsType, Field, Int } from 'type-graphql'
import { Owner, Owners } from '../../entity/Owner'

@ArgsType()
export class Pagination {
  @Field(() => Int)
  skip: number = 0

  @Field(() => Int)
  limit: number = 25
}

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
