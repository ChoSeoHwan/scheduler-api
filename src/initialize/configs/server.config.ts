import { registerAs } from '@nestjs/config';
import Joi from 'joi';

import NodeEnvType from '~/common/constants/NodeEnvType';
import Parser from '~/common/libs/Parser';
import { ValidateSchema } from '~/types/utils';

export interface ServerConfig {
    NODE_ENV: string;
    PORT: number;
    IS_PRODUCTION: boolean;
}

export const validateSchema: ValidateSchema<
    Omit<ServerConfig, 'IS_PRODUCTION'>
> = {
    NODE_ENV: Joi.string()
        .valid(
            NodeEnvType.DEVELOPMENT,
            NodeEnvType.PRODUCTION,
            NodeEnvType.TEST
        )
        .default(NodeEnvType.DEVELOPMENT),
    PORT: Joi.number().default(3000)
};

export default registerAs('server', (): ServerConfig => {
    const nodeEnv = Parser.string(
        process.env.NODE_ENV,
        NodeEnvType.DEVELOPMENT
    );

    return {
        NODE_ENV: nodeEnv,
        PORT: Parser.int(process.env.PORT, 3000),
        IS_PRODUCTION: nodeEnv === NodeEnvType.PRODUCTION
    };
});
