import { ConfigModule as ConfigModuleBase } from '@nestjs/config';
import Joi from 'joi';

import DatabaseConfig, {
    validateSchema
} from '~/initialize/database/configs/database.config';

export const ConfigModule = ConfigModuleBase.forRoot({
    validationSchema: Joi.object(validateSchema),
    load: [DatabaseConfig]
});
