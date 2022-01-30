import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import ConfigException from '~/common/exceptions/ConfigException';
import { ConfigModule } from '~/initialize/database/Config.module';
import { DatabaseConfig } from '~/initialize/database/configs/database.config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const databaseConfig =
                    configService.get<DatabaseConfig>('database');
                if (typeof databaseConfig === 'undefined') {
                    throw new ConfigException('database.*', databaseConfig);
                }

                const {
                    DB_READ_HOST,
                    DB_WRITE_HOST,
                    DB_PORT,
                    DB_USER,
                    DB_PASSWORD
                } = databaseConfig;

                return {
                    type: 'mysql',
                    replication: {
                        master: {
                            host: DB_WRITE_HOST,
                            port: DB_PORT,
                            username: DB_USER,
                            password: DB_PASSWORD
                        },
                        slaves: [
                            {
                                host: DB_READ_HOST,
                                port: DB_PORT,
                                username: DB_USER,
                                password: DB_PASSWORD
                            }
                        ]
                    },
                    autoLoadEntities: true,
                    logging: true,
                    logger: 'file'
                };
            }
        })
    ]
})
export class DatabaseModule {}
