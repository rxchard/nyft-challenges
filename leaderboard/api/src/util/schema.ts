import { buildSchema } from 'type-graphql'

import { LeaderboardResolver } from '../modules/owner/Leaderboard'

export const loadSchema = () =>
  buildSchema({
    resolvers: [LeaderboardResolver],
  })
