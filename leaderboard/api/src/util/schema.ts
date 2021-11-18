import { buildSchema } from 'type-graphql'

import { FindRankResolver } from '../modules/owner/FindRank'
import { LeaderboardResolver } from '../modules/owner/Leaderboard'
import { TotalOwnersResolver } from '../modules/owner/TotalOwners'
import { UpdateDetailsResolver } from '../modules/owner/UpdateDetails'

export const loadSchema = () =>
  buildSchema({
    resolvers: [
      LeaderboardResolver,
      UpdateDetailsResolver,
      FindRankResolver,
      TotalOwnersResolver,
    ],
  })
