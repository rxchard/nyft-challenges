import { Arg, Query, Resolver } from 'type-graphql'
import { Owners } from '../../entity/Owner'

@Resolver()
export class FindRankResolver {
  @Query(() => Number, { nullable: true })
  async findRank(@Arg('address') address: string): Promise<number | null> {
    const sorted = await Owners.find().sort({ valuation: -1 })
    const idx = sorted.findIndex(owner => owner.address === address)

    return idx === -1 ? null : idx + 1
  }
}
