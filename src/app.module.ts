import { Module } from '@nestjs/common';

import { InitializeModule } from '~/initialize/Initialize.module';
import { SchedulerModule } from '~/scheduler/Scheduler.module';

@Module({
    imports: [InitializeModule, SchedulerModule]
})
export class AppModule {}
