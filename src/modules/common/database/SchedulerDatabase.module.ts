import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import Joi from 'joi';

import ConfigException from '~/exceptions/ConfigException';
import DatabaseConfig, {
    DatabaseConfig as DatabaseConfigInterface,
    validateSchema
} from '~/modules/common/database/configs/database.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: Joi.object(validateSchema),
            load: [DatabaseConfig]
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const databaseConfig =
                    configService.get<DatabaseConfigInterface>('database');
                if (typeof databaseConfig === 'undefined') {
                    throw new ConfigException('database.*', databaseConfig);
                }

                const { DB_READ_HOST, DB_PORT, DB_USER, DB_PASSWORD } =
                    databaseConfig;

                return {
                    name: 'scheduler_db.read',
                    type: 'mysql',
                    host: DB_READ_HOST,
                    port: DB_PORT,
                    username: DB_USER,
                    password: DB_PASSWORD,
                    database: 'scheduler_db'
                };
            }
        })
    ]
})
export class SchedulerDatabaseModule {}
