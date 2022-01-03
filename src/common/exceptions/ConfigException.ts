import { ApolloError } from 'apollo-server-express';

class ConfigException extends ApolloError {
    static ERROR_CODE = 'UNDEFINED_CONFIG';

    static DEFAULT_ERROR_MSG = '필수 정보가 존재하지 않습니다.';

    constructor(requiredKey: string | string[], value: unknown) {
        super(ConfigException.DEFAULT_ERROR_MSG, ConfigException.ERROR_CODE, {
            development: {
                required: requiredKey,
                value: value
            }
        });
    }
}

export default ConfigException;
