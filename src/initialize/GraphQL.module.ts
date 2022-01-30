import { ConfigService } from '@nestjs/config';
import { GraphQLModule as GraphQLModuleBase } from '@nestjs/graphql/dist/graphql.module';
import path from 'path';

import { SOURCE_ROOT } from '~/common/constants/etc';
import Parser from '~/common/libs/Parser';
import { ServerConfig } from '~/initialize/configs/server.config';

const schemaPath = path.resolve(SOURCE_ROOT, '../schema.gql');

export const GraphQLModule = GraphQLModuleBase.forRootAsync({
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
});
