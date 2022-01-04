import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ScheduleEntity } from '~/common/entities/scheduler/Schedule.entity';
import { BaseLoader } from '~/common/loader';
import { GroupModel } from '~/scheduler/models/Group.model';

@Injectable()
export class ScheduleLoader extends BaseLoader<number, GroupModel[]> {
    constructor(
        @InjectRepository(ScheduleEntity)
        private readonly scheduleRepository: Repository<ScheduleEntity>
    ) {
        super();
    }

    protected async batch(idxList: number[]): Promise<GroupModel[][]> {
        const schedules = await this.scheduleRepository.findByIds(idxList, {
            relations: ['groups']
        });
        if (!schedules) return [];

        return idxList.map<GroupModel[]>((idx) => {
            const schedule = schedules.find((schedule) => schedule.idx === idx);
            if (!schedule) return [];

            const groups = schedule.groups;
            return groups.map<GroupModel>(
                ({ idx, name, type, created_at, updated_at }) => ({
                    idx,
                    name,
                    type,
                    created_at,
                    updated_at
                })
            );
        });
    }
}
