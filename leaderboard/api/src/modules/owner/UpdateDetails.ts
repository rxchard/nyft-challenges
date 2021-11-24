import { ethers } from 'ethers'
import { Args, ArgsType, Field, Mutation, Resolver } from 'type-graphql'
import { Owner } from '../../entity/Owner'
import { error } from '../../winston'
import { accessOwner } from './util'

@ArgsType()
export class UpdateDetailsArgs {
  @Field() address!: string
  @Field() signature!: string
  @Field({ nullable: true }) name: string = ''
  @Field({ nullable: true }) text: string = ''
}

@Resolver()
export class UpdateDetailsResolver {
  @Mutation(() => Owner, { nullable: true })
  async updateDetails(
    @Args() { address, name, text, signature }: UpdateDetailsArgs,
  ): Promise<Owner | null> {
    name = name.trim()
    text = text.trim()

    try {
      const { owner, updateAllowed } = await accessOwner(address)

      if (!owner || !updateAllowed) {
        return null
      }

      const message = [name, text].map(v => v || 'empty').join(':')
      const recovered = await ethers.utils.verifyMessage(message, signature)

      if (recovered !== address) {
        return null
      }

      // apply change or set empty
      owner.details = { name, text }

      return owner.save()
    } catch (err) {
      error(err as string)
      return null
    }
  }
}
