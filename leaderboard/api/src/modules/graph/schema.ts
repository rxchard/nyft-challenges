import { buildSchema } from 'type-graphql'

import { OwnerResolver } from '../owner/Owner'
import { LeaderboardResolver } from '../owner/Leaderboard'
import { TotalOwnersResolver } from '../owner/TotalOwners'
import { UpdateDetailsResolver } from '../owner/UpdateDetails'

export const loadSchema = () =>
  buildSchema({
    resolvers: [
      LeaderboardResolver,
      UpdateDetailsResolver,
      OwnerResolver,
      TotalOwnersResolver,
    ],
  })
