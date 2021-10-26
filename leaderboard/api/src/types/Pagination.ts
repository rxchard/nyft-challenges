import { ArgsType, Field, Int } from 'type-graphql'

@ArgsType()
export class Pagination {
  @Field(() => Int)
  skip: number = 0

  @Field(() => Int)
  limit: number = 25
}
