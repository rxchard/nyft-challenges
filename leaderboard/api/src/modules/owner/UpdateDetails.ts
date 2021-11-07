import { ethers } from 'ethers'
import { Args, ArgsType, Field, Mutation, Resolver } from 'type-graphql'
import { Owner, Owners } from '../../entity/Owner'

@ArgsType()
export class DetailsArgs {
  @Field() address!: string
  @Field() signature!: string
  @Field({ nullable: true }) name?: string
  @Field({ nullable: true }) text?: string
}

@Resolver()
export class UpdateDetailsResolver {
  @Mutation(() => Owner, { nullable: true })
  async updateDetails(
    @Args() { address, name, text, signature }: DetailsArgs,
  ): Promise<Owner | null> {
    // both empty is not accepted
    if (!name && !text) return null

    try {
      const owner = await Owners.findOne({ address })

      if (!owner) {
        return null
      }

      // won't apply same signature twice
      if (owner.details && owner.details.signature === signature) {
        return owner
      }

      const message = [name, text].join(':')
      const recovered = await ethers.utils.verifyMessage(message, signature)

      if (recovered !== address) {
        return null
      }

      owner.details = {
        name,
        text,
        signature,
      }

      return owner.save()
    } catch (err) {
      return null
    }
  }
}
