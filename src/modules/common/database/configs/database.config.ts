import { registerAs } from '@nestjs/config';
import Joi from 'joi';

import Parser from '~/libs/Parser';
import { ValidateSchema } from '~/types/utils';

export interface DatabaseConfig {
    DB_WRITE_HOST: string;
    DB_READ_HOST: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_PORT: number;
}

export const validateSchema: ValidateSchema<DatabaseConfig> = {
    DB_WRITE_HOST: Joi.string().required(),
    DB_READ_HOST: Joi.string().required(),
    DB_USER: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_PORT: Joi.number().default(3306)
};

export default registerAs(
    'database',
    (): DatabaseConfig => ({
        DB_WRITE_HOST: Parser.string(process.env.DB_WRITE_HOST),
        DB_READ_HOST: Parser.string(process.env.DB_READ_HOST),
        DB_USER: Parser.string(process.env.DB_USER),
        DB_PASSWORD: Parser.string(process.env.DB_PASSWORD),
        DB_PORT: Parser.number(process.env.DB_PORT, 3306)
    })
);
