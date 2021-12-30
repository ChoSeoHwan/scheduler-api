import { ArgsType, Field } from '@nestjs/graphql';
import { Max } from 'class-validator';

@ArgsType()
export class ScheduleArgs {
    @Field()
    @Max(10)
    idx: number;
}
