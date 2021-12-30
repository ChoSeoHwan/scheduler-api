import { registerAs } from '@nestjs/config';
import Joi from 'joi';

import Parser from '~/libs/Parser';
import { ValidateSchema } from '~/types/joi';

export interface ServerConfig {
    NODE_ENV: string;
    PORT: number;
}

export const validateSchema: ValidateSchema<ServerConfig> = {
    NODE_ENV: Joi.string()
        .valid('development', 'production', 'test', 'provision')
        .default('development'),
    PORT: Joi.number().default(3000)
};

export default registerAs(
    'server',
    (): ServerConfig => ({
        NODE_ENV: Parser.string(process.env.NODE_ENV, 'development'),
        PORT: Parser.int(process.env.PORT, 3000)
    })
);
