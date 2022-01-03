import { Module } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';

import { ConfigModule } from '~/initialize/Config.module';
import { DatabaseModule } from '~/initialize/database/Database.module';
import { AllExceptionFilter } from '~/initialize/filters/AllException.filter';
import { GraphQLModule } from '~/initialize/GraphQL.module';
import { ValidationPipe } from '~/initialize/pipes/Validation.pipe';

@Module({
    imports: [
        // config module 세팅
        ConfigModule,

        // graphql module 세팅
        GraphQLModule,

        // database module 세팅
        DatabaseModule
    ],
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
export class InitializeModule {}
