import { ethers } from 'ethers'
import { Args, ArgsType, Field, Mutation, Resolver } from 'type-graphql'
import { Owner, Owners } from '../../entity/Owner'
import { error } from '../../winston'

@ArgsType()
export class DetailsArgs {
  @Field() address!: string
  @Field() signature!: string
  @Field({ nullable: true }) name: string = ''
  @Field({ nullable: true }) text: string = ''
}

@Resolver()
export class UpdateDetailsResolver {
  @Mutation(() => Owner, { nullable: true })
  async updateDetails(
    @Args() { address, name, text, signature }: DetailsArgs,
  ): Promise<Owner | null> {
    name = name.trim()
    text = text.trim()

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

      if (!owner.details) owner.details = {}

      owner.details.signature = signature

      if (name) owner.details.name = name
      if (text) owner.details.text = text

      return owner.save()
    } catch (err) {
      error(err as string)
      return null
    }
  }
}
