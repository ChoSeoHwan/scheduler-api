import {
    Injectable,
    ValidationPipe as ValidationPipeBase
} from '@nestjs/common';

import ValidationException from '~/exceptions/ValidationException';

@Injectable()
export class ValidationPipe extends ValidationPipeBase {
    constructor() {
        super({
            transform: true,
            exceptionFactory(errors) {
                return new ValidationException(errors);
            }
        });
    }
}
