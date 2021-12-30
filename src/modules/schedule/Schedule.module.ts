import { Module } from '@nestjs/common';

import { ScheduleResolver } from '~/modules/schedule/Schedule.resolver';

@Module({
    providers: [ScheduleResolver]
})
export class ScheduleModule {}
