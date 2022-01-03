import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ScheduleEntity } from '~/common/entities/scheduler/Schedule.entity';
import { GroupModel } from '~/scheduler/models/Group.model';
import { Nullable } from '~/types/utils';

@Injectable()
export class ScheduleService {
    constructor(
        @InjectRepository(ScheduleEntity)
        private readonly scheduleRepository: Repository<ScheduleEntity>
    ) {}

    /**
     * schedule 내의 group 리스트 조회
     *
     * @param {number} scheduleIdx index
     * @returns {Promise<Nullable<GroupModel[]>>} group 리스트 데이터
     */
    async getGroupsFromSchedule(
        scheduleIdx: number
    ): Promise<Nullable<GroupModel[]>> {
        const schedule = await this.scheduleRepository.findOne(scheduleIdx, {
            relations: ['groups']
        });
        if (!schedule) return null;

        return schedule.groups.map((group) => ({
            idx: group.idx,
            name: group.name,
            type: group.type,
            created_at: group.created_at,
            updated_at: group.updated_at
        }));
    }
}
