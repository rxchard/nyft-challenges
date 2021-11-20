import { Arg, Int, Query, Resolver } from 'type-graphql'
import { findOwnerIndex } from './util'

@Resolver()
export class FindRankResolver {
  @Query(() => Int, { nullable: true })
  async findRank(@Arg('address') address: string): Promise<number | null> {
    return findOwnerIndex(address)
  }
}
