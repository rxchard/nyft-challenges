import { ObjectType, Field } from 'type-graphql'
import { prop, getModelForClass, pre } from '@typegoose/typegoose'

@ObjectType()
export class Balance {
  @Field() @prop() iron!: number
  @Field() @prop() bronze!: number
  @Field() @prop() silver!: number
  @Field() @prop() gold!: number
  @Field() @prop() neon!: number
  @Field() @prop() ultra!: number

  public evaluate(): number {
    return (
      this.iron * 1 +
      this.bronze * 2 +
      this.silver * 4 +
      this.gold * 8 +
      this.neon * 40 +
      this.ultra * 200
    )
  }
}

@ObjectType()
@pre<Owner>('save', function () {
  this.valuation = this.balance.evaluate()
})
export class Owner {
  // ERC-20 Address
  @Field()
  @prop()
  address!: string

  @Field()
  @prop({ type: Balance, _id: false })
  balance!: Balance

  @Field()
  @prop()
  valuation!: number
}

export const Owners = getModelForClass(Owner)
