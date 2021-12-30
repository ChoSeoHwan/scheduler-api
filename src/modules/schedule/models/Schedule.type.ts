import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Schedule {
    @Field(() => Int)
    idx: number;

    @Field(() => String)
    title: string;

    @Field(() => String)
    description: string;

    @Field(() => Date)
    created_at: Date;
}
