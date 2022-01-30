import {
    Args,
    Mutation,
    Parent,
    ResolveField,
    Resolver
} from '@nestjs/graphql';

import { AddScheduleArgs } from '~/scheduler/dto/AddSchedule.args';
import { ScheduleModel } from '~/scheduler/models/Schedule.model';
import { ScheduleService } from '~/scheduler/services/Schedule.service';

@Resolver(() => ScheduleModel)
export class ScheduleResolver {
    constructor(private readonly scheduleService: ScheduleService) {}

    @Mutation(() => ScheduleModel)
    async addSchedule(@Args() args: AddScheduleArgs): Promise<ScheduleModel> {
        return await this.scheduleService.addSchedule(args);
    }

    @ResolveField()
    async groups(
        @Parent()
        schedule: ScheduleModel
    ) {
        return await this.scheduleService.getGroupsFromSchedule(schedule.idx);
    }
}
