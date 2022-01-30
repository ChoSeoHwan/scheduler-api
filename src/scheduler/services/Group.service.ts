import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GroupEntity } from '~/common/entities/scheduler/Group.entity';
import { GroupLoader } from '~/scheduler/loader/Group.loader';
import { GroupModel } from '~/scheduler/models/Group.model';
import { ScheduleModel } from '~/scheduler/models/Schedule.model';
import { Nullable } from '~/types/utils';

@Injectable()
export class GroupService {
    constructor(
        @InjectRepository(GroupEntity)
        private readonly groupRepository: Repository<GroupEntity>,
        private readonly groupLoader: GroupLoader
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
        return await this.groupLoader.load(groupIdx);
    }
}
