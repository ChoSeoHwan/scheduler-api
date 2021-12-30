import { ConfigService } from '@nestjs/config';
import { Args, Query, Resolver } from '@nestjs/graphql';

import scheduleList from '~/data/schedule-list';
import { ScheduleArgs } from '~/modules/schedule/dto/Schedule.args';
import { Schedule } from '~/modules/schedule/models/Schedule.type';
import { Nullable } from '~/types/utils';

@Resolver(Schedule)
export class ScheduleResolver {
    @Query(() => Schedule, { nullable: true })
    schedule(@Args() { idx }: ScheduleArgs): Nullable<Schedule> {
        if (!scheduleList[idx]) return null;
        return scheduleList[idx];
    }
}
