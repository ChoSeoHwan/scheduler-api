import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GroupEntity } from '~/common/entities/scheduler/Group.entity';
import { BaseLoader } from '~/common/loader';
import { ScheduleModel } from '~/scheduler/models/Schedule.model';

@Injectable()
export class GroupLoader extends BaseLoader<number, ScheduleModel[]> {
    constructor(
        @InjectRepository(GroupEntity)
        private readonly groupRepository: Repository<GroupEntity>
    ) {
        super();
    }

    protected async batch(idxList: number[]): Promise<ScheduleModel[][]> {
        const groups = await this.groupRepository.findByIds(idxList, {
            relations: ['schedules']
        });
        if (!groups) return [];

        return idxList.map<ScheduleModel[]>((idx) => {
            const group = groups.find((group) => group.idx === idx);
            if (!group) return [];

            const schedules = group.schedules;
            return schedules.map<ScheduleModel>(
                ({ idx, title, description, created_at, updated_at }) => ({
                    idx,
                    title,
                    description,
                    created_at,
                    updated_at
                })
            );
        });
    }
}
