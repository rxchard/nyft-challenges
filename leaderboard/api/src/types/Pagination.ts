import { ArgsType, Field } from 'type-graphql'

@ArgsType()
export class Pagination {
  @Field()
  skip: number = 0

  @Field()
  limit: number = 25
}
