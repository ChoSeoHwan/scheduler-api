import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GroupEntity } from '~/common/entities/scheduler/Group.entity';
import { ScheduleEntity } from '~/common/entities/scheduler/Schedule.entity';
import loaders from '~/scheduler/loader';
import resolvers from '~/scheduler/resolvers';
import services from '~/scheduler/services';
import { CheckGroupValidator } from '~/scheduler/validators/CheckGroup.validator';

@Module({
    imports: [TypeOrmModule.forFeature([GroupEntity, ScheduleEntity])],
    providers: [...resolvers, ...services, ...loaders, CheckGroupValidator]
})
export class SchedulerModule {}
