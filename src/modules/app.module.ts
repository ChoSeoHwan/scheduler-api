import { Module } from '@nestjs/common';

import { InitializeModule } from '~/modules/initialize/Initialize.module';
import { ScheduleModule } from '~/modules/schedule/Schedule.module';

@Module({
    imports: [InitializeModule, ScheduleModule]
})
export class AppModule {}
