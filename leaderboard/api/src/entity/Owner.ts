import { ObjectType, Field, Int } from 'type-graphql'
import {
  prop,
  getModelForClass,
  pre,
  ReturnModelType,
} from '@typegoose/typegoose'

@ObjectType()
export class Balance {
  @Field(() => Int) @prop() iron!: number
  @Field(() => Int) @prop() bronze!: number
  @Field(() => Int) @prop() silver!: number
  @Field(() => Int) @prop() gold!: number
  @Field(() => Int) @prop() neon!: number
  @Field(() => Int) @prop() ultra!: number

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
export class Details {
  // Custom name, replaces ens/address
  @Field({ nullable: true })
  @prop()
  name?: string

  // Custom paragraph below the address/name
  @Field({ nullable: true })
  @prop()
  text?: string
}

@ObjectType()
@pre<Owner>('save', function () {
  this.valuation = this.balance.evaluate()
})
export class Owner {
  // ERC-20 Address
  @Field()
  @prop({ unique: true })
  address!: string

  @Field()
  @prop({ type: Balance, _id: false })
  balance!: Balance

  @Field(() => Int)
  @prop()
  valuation!: number

  @Field({ nullable: true })
  @prop({ type: Details, _id: false })
  details?: Details

  public static findActive(this: ReturnModelType<typeof Owner>) {
    return this.find({ valuation: { $gt: 0 } })
  }
}

export const Owners = getModelForClass(Owner)
