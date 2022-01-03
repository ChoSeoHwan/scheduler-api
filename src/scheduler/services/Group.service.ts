import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GroupEntity } from '~/common/entities/scheduler/Group.entity';
import { GroupModel } from '~/scheduler/models/Group.model';
import { ScheduleModel } from '~/scheduler/models/Schedule.model';
import { Nullable } from '~/types/utils';

@Injectable()
export class GroupService {
    constructor(
        @InjectRepository(GroupEntity)
        private readonly groupRepository: Repository<GroupEntity>
    ) {}

    /**
     * group 리스트 조회
     *
     * @returns {Promise<GroupModel[]>} group 리스트
     */
    async getGroups(): Promise<GroupModel[]> {
        const groups = await this.groupRepository.find();

        return groups.map((group) => ({
            idx: group.idx,
            name: group.name,
            type: group.type,
            created_at: group.created_at,
            updated_at: group.updated_at
        }));
    }

    /**
     * group 내의 schedule 리스트 조회
     *
     * @param {idx} groupIdx group 번호
     * @returns {Promise<Nullable<ScheduleModel[]>>} schedule 리스트
     */
    async getSchedulesFromGroup(
        groupIdx: number
    ): Promise<Nullable<ScheduleModel[]>> {
        const groups = await this.groupRepository.findOne(groupIdx, {
            relations: ['schedules']
        });
        if (!groups) return null;

        return groups.schedules.map((schedule) => ({
            idx: schedule.idx,
            title: schedule.title,
            description: schedule.description,
            created_at: schedule.created_at,
            updated_at: schedule.updated_at
        }));
    }
}
