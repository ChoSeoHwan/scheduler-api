import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { ScheduleModel } from '~/scheduler/models/Schedule.model';
import { ScheduleService } from '~/scheduler/services/Schedule.service';

@Resolver(() => ScheduleModel)
export class ScheduleResolver {
    constructor(private readonly scheduleService: ScheduleService) {}

    @ResolveField()
    async groups(
        @Parent()
        schedule: ScheduleModel
    ) {
        return await this.scheduleService.getGroupsFromSchedule(schedule.idx);
    }
}
