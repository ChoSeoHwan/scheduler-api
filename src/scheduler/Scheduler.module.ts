import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GroupEntity } from '~/common/entities/scheduler/Group.entity';
import { ScheduleEntity } from '~/common/entities/scheduler/Schedule.entity';
import loaders from '~/scheduler/loader';
import resolvers from '~/scheduler/resolvers';
import services from '~/scheduler/services';

@Module({
    imports: [TypeOrmModule.forFeature([GroupEntity, ScheduleEntity])],
    providers: [...resolvers, ...services, ...loaders]
})
export class SchedulerModule {}
