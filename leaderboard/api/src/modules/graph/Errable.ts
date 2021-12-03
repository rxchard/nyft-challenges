import { Field, ObjectType } from 'type-graphql'

@ObjectType()
class ErrorEntry {
  @Field() message!: string
}

@ObjectType()
export class Errable {
  // could be an array of errors but this is sufficient here
  @Field({ nullable: true })
  error?: ErrorEntry
}
