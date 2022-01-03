import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GroupEntity } from '~/common/entities/scheduler/Group.entity';
import { ScheduleEntity } from '~/common/entities/scheduler/Schedule.entity';
import { GroupResolver } from '~/scheduler/resolvers/Group.resolver';
import { ScheduleResolver } from '~/scheduler/resolvers/Schedule.resolver';
import { GroupService } from '~/scheduler/services/Group.service';
import { ScheduleService } from '~/scheduler/services/Schedule.service';

@Module({
    imports: [TypeOrmModule.forFeature([GroupEntity, ScheduleEntity])],
    providers: [GroupResolver, ScheduleResolver, GroupService, ScheduleService]
})
export class SchedulerModule {}
