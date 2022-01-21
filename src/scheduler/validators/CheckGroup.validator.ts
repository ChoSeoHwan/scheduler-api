import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    ValidatorConstraint,
    ValidatorConstraintInterface
} from 'class-validator';
import { Repository } from 'typeorm';

import { GroupEntity } from '~/common/entities/scheduler/Group.entity';
import ValidationException from '~/common/exceptions/ValidationException';

@ValidatorConstraint({ name: 'CheckGroup', async: true })
@Injectable()
export class CheckGroupValidator implements ValidatorConstraintInterface {
    constructor(
        @InjectRepository(GroupEntity)
        private readonly groupRepository: Repository<GroupEntity>
    ) {}

    async validate(idx: number) {
        try {
            const group = await this.groupRepository.findOne(idx);
            if (typeof group === 'undefined') return false;
        } catch (error) {
            return false;
        }

        return true;
    }

    defaultMessage(): string {
        return ValidationException.CHECK_GROUP_ERROR_MSG;
    }
}
