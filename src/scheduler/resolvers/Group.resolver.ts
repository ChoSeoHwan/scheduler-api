import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { GroupModel } from '~/scheduler/models/Group.model';
import { GroupService } from '~/scheduler/services/Group.service';

@Resolver(() => GroupModel)
export class GroupResolver {
    constructor(private readonly groupService: GroupService) {}

    @Query(() => [GroupModel])
    async groups() {
        return await this.groupService.getGroups();
    }

    @ResolveField()
    async schedules(
        @Parent()
        group: GroupModel
    ) {
        return await this.groupService.getSchedulesFromGroup(group.idx);
    }
}
