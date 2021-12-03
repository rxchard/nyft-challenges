import { ethers } from 'ethers'
import {
  Args,
  ArgsType,
  Field,
  Mutation,
  ObjectType,
  Resolver,
} from 'type-graphql'
import { Owner } from '../../entity/Owner'
import { error } from '../../winston'
import { Errable } from '../graph/Errable'
import { accessOwner } from './util'

@ArgsType()
export class UpdateDetailsArgs {
  @Field() address!: string
  @Field() signature!: string
  @Field() name!: string
  @Field() text!: string
}

@ObjectType()
class UpdateDetailsResult extends Errable {
  @Field({ nullable: true })
  owner?: Owner
}

@Resolver()
export class UpdateDetailsResolver {
  @Mutation(() => UpdateDetailsResult, { nullable: true })
  async updateDetails(
    @Args() { address, name, text, signature }: UpdateDetailsArgs,
  ): Promise<UpdateDetailsResult> {
    name = name.trim()
    text = text.trim()

    try {
      const { owner, updateAllowed } = await accessOwner(address)

      if (!owner || !updateAllowed) {
        return { error: { message: 'Missing access' } }
      }

      const message = [name, text].map(v => v || 'empty').join(':')
      const recovered = await ethers.utils.verifyMessage(message, signature)

      if (recovered !== address) {
        return { error: { message: 'Invalid message' } }
      }

      // apply change or set empty
      owner.details = { name, text }

      await owner.save()

      return { owner }
    } catch (err) {
      error(err as string)
      // may be invalid signature
      return { error: { message: 'Unknown error' } }
    }
  }
}
