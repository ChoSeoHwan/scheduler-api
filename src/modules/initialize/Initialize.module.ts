import { Module } from '@nestjs/common';
import { ConfigModule as ConfigModuleBase } from '@nestjs/config/dist/config.module';
import { GraphQLModule as GraphQLModuleBase } from '@nestjs/graphql/dist/graphql.module';
import Joi from 'joi';
import path from 'path';

import { SOURCE_ROOT } from '~/constants/etc';
import serverConfig, {
    validateSchema as ServerValidateSchema
} from '~/modules/initialize/configs/server.config';

const schemaPath = path.resolve(SOURCE_ROOT, '../schema.gql');

@Module({
    imports: [
        // config module 세팅
        ConfigModuleBase.forRoot({
            isGlobal: true,
            validationSchema: Joi.object(ServerValidateSchema),
            load: [serverConfig]
        }),

        // graphql module 세팅
        GraphQLModuleBase.forRoot({
            autoSchemaFile: schemaPath,
            playground: true,
            formatError: (error) => {
                const isProduction = process.env.NODE_ENV === 'production';

                // 실서버일 경우 실제 에러 제거
                if (
                    isProduction &&
                    typeof error?.extensions?.exception !== 'undefined'
                ) {
                    delete error.extensions.exception;
                }

                return error;
            }
        })
    ]
})
export class InitializeModule {}
