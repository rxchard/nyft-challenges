import { Arg, Query, Resolver } from 'type-graphql'
import { Owner, Owners } from '../../entity/Owner'

@Resolver()
export class LeaderboardResolver {
  @Query(returns => [Owner])
  async currentLeaderboard() {
    return await Owners.find().sort({ valuation: -1 }).limit(5)
  }
}
