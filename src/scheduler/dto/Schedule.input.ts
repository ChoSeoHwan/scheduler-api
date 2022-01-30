import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ScheduleInput {
    @Field()
    title: string;

    @Field({ nullable: true })
    description?: string;
}
