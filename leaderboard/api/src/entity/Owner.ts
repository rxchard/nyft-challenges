import { ObjectType, Field } from 'type-graphql'
import { prop, getModelForClass } from '@typegoose/typegoose'

@ObjectType()
class Palms {
  @Field()
  @prop()
  ultra!: number

  @Field()
  @prop()
  neon!: number

  @prop()
  @Field()
  gold!: number

  @prop()
  @Field()
  silver!: number

  @prop()
  @Field()
  bronze!: number

  @prop()
  @Field()
  iron!: number
}

@ObjectType()
export class Owner {
  // ERC-20 Address
  @prop()
  @Field()
  address!: string

  @prop({ type: Palms, _id: false })
  @Field()
  palms!: Palms
}

// export const OwnerModel = getModelForClass(Owner, { schemaOptions: { collection: '' } })
export const OwnerModel = getModelForClass(Owner)
