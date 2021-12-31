import { ConfigService } from '@nestjs/config';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Connection } from 'typeorm';

import scheduleList from '~/data/schedule-list';
import { ScheduleArgs } from '~/modules/schedule/dto/Schedule.args';
import { Schedule } from '~/modules/schedule/models/Schedule.type';
import { Nullable } from '~/types/utils';

@Resolver(Schedule)
export class ScheduleResolver {
    constructor(private readonly connection: Connection) {}

    @Query(() => Schedule, { nullable: true })
    schedule(@Args() { idx }: ScheduleArgs): Nullable<Schedule> {
        console.log(this.connection);
        if (!scheduleList[idx]) return null;
        return scheduleList[idx];
    }

    @Query(() => [Schedule])
    schedules(@Args() { idx }: ScheduleArgs) {
        return scheduleList;
    }
}
