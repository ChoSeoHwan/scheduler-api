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

console.log(SOURCE_ROOT);
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
            playground: true
        })
    ]
})
export class InitializeModule {}
