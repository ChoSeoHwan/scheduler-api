import { ConfigModule as ConfigModuleBase } from '@nestjs/config/dist/config.module';
import Joi from 'joi';

import serverConfig, {
    validateSchema as ServerValidateSchema
} from '~/initialize/configs/server.config';

export const ConfigModule = ConfigModuleBase.forRoot({
    isGlobal: true,
    validationSchema: Joi.object(ServerValidateSchema),
    load: [serverConfig]
});
