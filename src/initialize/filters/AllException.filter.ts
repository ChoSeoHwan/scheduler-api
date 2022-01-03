import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionFilter extends BaseExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const type = host.getType();

        if (type === 'http') {
            return super.catch(exception, host);
        } else {
            throw exception;
        }
    }
}
