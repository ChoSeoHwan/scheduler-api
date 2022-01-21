import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Validate } from 'class-validator';

import { ScheduleInput } from '~/scheduler/dto/Schedule.input';
import { CheckGroupValidator } from '~/scheduler/validators/CheckGroup.validator';

@ArgsType()
export class AddScheduleArgs {
    @Field(() => Int)
    @Validate(CheckGroupValidator)
    groupIdx: number;

    @Field(() => ScheduleInput)
    schedule: ScheduleInput;
}
