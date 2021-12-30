import { Module } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';

import { AllExceptionFilter } from '~/filters/AllException.filter';
import { InitializeModule } from '~/modules/initialize/Initialize.module';
import { ScheduleModule } from '~/modules/schedule/Schedule.module';
import { ValidationPipe } from '~/pipes/Validation.pipe';

@Module({
    imports: [InitializeModule, ScheduleModule],
    providers: [
        {
            provide: APP_PIPE,
            useClass: ValidationPipe
        },
        {
            provide: APP_FILTER,
            useClass: AllExceptionFilter
        }
    ]
})
export class AppModule {}
