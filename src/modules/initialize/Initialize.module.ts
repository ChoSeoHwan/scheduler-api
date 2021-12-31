import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigModule as ConfigModuleBase } from '@nestjs/config/dist/config.module';
import { GraphQLModule as GraphQLModuleBase } from '@nestjs/graphql/dist/graphql.module';
import Joi from 'joi';
import path from 'path';

import { SOURCE_ROOT } from '~/constants/etc';
import Parser from '~/libs/Parser';
import serverConfig, {
    ServerConfig,
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
        GraphQLModuleBase.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return {
                    autoSchemaFile: schemaPath,
                    playground: true,
                    formatError: (error) => {
                        const { IS_PRODUCTION } =
                            configService.get<ServerConfig>('server') || {};

                        // 실서버일 경우 실제 에러 및 추가 정보 제거
                        if (
                            Parser.boolean(IS_PRODUCTION) &&
                            typeof error?.extensions !== 'undefined'
                        ) {
                            delete error.extensions.exception;
                            delete error.extensions.development;
                        }

                        return error;
                    }
                };
            }
        })
    ]
})
export class InitializeModule {}
