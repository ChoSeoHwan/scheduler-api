import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';

import databaseConfig, {
    validateSchema
} from '~/modules/common/database/configs/database.config';
import { SchedulerDatabaseModule } from '~/modules/common/database/SchedulerDatabase.module';
import { ScheduleResolver } from '~/modules/schedule/Schedule.resolver';

@Module({
    imports: [
        SchedulerDatabaseModule,
        ConfigModule.forRoot({
            validationSchema: Joi.object(validateSchema),
            load: [databaseConfig]
        })
    ],
    providers: [ScheduleResolver]
})
export class ScheduleModule {}
