import { buildSchema } from 'type-graphql'

import { OwnerResolver } from '../modules/owner/Owner'
import { LeaderboardResolver } from '../modules/owner/Leaderboard'
import { TotalOwnersResolver } from '../modules/owner/TotalOwners'
import { UpdateDetailsResolver } from '../modules/owner/UpdateDetails'

export const loadSchema = () =>
  buildSchema({
    resolvers: [
      LeaderboardResolver,
      UpdateDetailsResolver,
      OwnerResolver,
      TotalOwnersResolver,
    ],
  })
