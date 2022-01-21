import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GroupEntity } from '~/common/entities/scheduler/Group.entity';
import { ScheduleEntity } from '~/common/entities/scheduler/Schedule.entity';
import { AddScheduleArgs } from '~/scheduler/dto/AddSchedule.args';
import { ScheduleLoader } from '~/scheduler/loader/Schedule.loader';
import { GroupModel } from '~/scheduler/models/Group.model';
import { ScheduleModel } from '~/scheduler/models/Schedule.model';
import { Nullable } from '~/types/utils';

@Injectable()
export class ScheduleService {
    constructor(
        @InjectRepository(ScheduleEntity)
        private readonly scheduleRepository: Repository<ScheduleEntity>,
        @InjectRepository(GroupEntity)
        private readonly groupRepository: Repository<GroupEntity>,
        private readonly scheduleLoader: ScheduleLoader
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
        return await this.scheduleLoader.load(scheduleIdx);
    }

    async addSchedule({
        groupIdx,
        schedule
    }: AddScheduleArgs): Promise<ScheduleModel> {
        const groups = await this.groupRepository.findByIds([groupIdx]);

        const scheduleEntity = new ScheduleEntity();
        scheduleEntity.title = schedule.title;
        scheduleEntity.description = schedule.description || '';
        scheduleEntity.groups = groups;
        const scheduleSaved = await this.scheduleRepository.save(
            scheduleEntity
        );

        return {
            idx: scheduleSaved.idx,
            title: scheduleSaved.title,
            description: scheduleSaved.description,
            updated_at: scheduleSaved.updated_at,
            created_at: scheduleSaved.created_at
        };
    }
}
