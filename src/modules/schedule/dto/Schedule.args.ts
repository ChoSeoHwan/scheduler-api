import { ArgsType, Field } from '@nestjs/graphql';

import { IsInt, Max } from '~/libs/validator';

@ArgsType()
export class ScheduleArgs {
    @Field()
    @Max(10)
    @IsInt()
    idx: number;

    @Field()
    @Max(5)
    test: number;
}
