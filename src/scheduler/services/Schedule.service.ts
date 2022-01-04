import { Injectable } from '@nestjs/common';

import { ScheduleLoader } from '~/scheduler/loader/Schedule.loader';
import { GroupModel } from '~/scheduler/models/Group.model';
import { Nullable } from '~/types/utils';

@Injectable()
export class ScheduleService {
    constructor(private readonly scheduleLoader: ScheduleLoader) {}

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
}
