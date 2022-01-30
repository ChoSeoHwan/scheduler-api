import { ValidationError } from '@nestjs/common';
import { UserInputError } from 'apollo-server-express';

import Warning from '~/common/exceptions/Warning';

interface ValidatesInfo {
    property: string;
    value: unknown;
    messages: string[];
}

@Warning
class ValidationException extends UserInputError {
    public static DEFAULT_ERROR_MSG = '잘못된 요청입니다.';
    public static MAX_ERROR_MSG = '해당 값은 $constraint1보다 작아야됩니다.';
    public static IS_INT_ERROR_MSG = '해당 값은 정수여야 합니다.';
    public static CHECK_GROUP_ERROR_MSG = '존재 하지 않는 그룹입니다.';

    constructor(errors: ValidationError[]) {
        // 유효성 검사에 대한 추가 정보 제공
        const validates = errors.reduce<ValidatesInfo[]>((validates, error) => {
            const messages = [];
            for (const key in error.constraints) {
                messages.push(error.constraints[key]);
            }

            validates.push({
                property: error.property,
                value: error.value,
                messages
            });
            return validates;
        }, []);

        super(ValidationException.DEFAULT_ERROR_MSG, {
            validate: validates
        });
    }
}

export default ValidationException;
