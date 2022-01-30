import { IsInt as IsIntBase, Max as MaxBase } from 'class-validator';

import ValidationException from '~/common/exceptions/ValidationException';

export const Max: typeof MaxBase = (maxValue, options) =>
    MaxBase(maxValue, {
        message: ValidationException.MAX_ERROR_MSG,
        ...options
    });

export const IsInt: typeof IsIntBase = (options) =>
    IsIntBase({
        message: ValidationException.IS_INT_ERROR_MSG,
        ...options
    });
