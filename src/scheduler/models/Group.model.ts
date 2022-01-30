import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';

import { Type as GroupType } from '~/common/entities/scheduler/Group.entity';
import { EmptyClass } from '~/common/libs/EmptyClass';
import { DateMixinModel } from '~/common/models/DateMixin.model';
import { ScheduleModel } from '~/scheduler/models/Schedule.model';

registerEnumType(GroupType, {
    name: 'GroupType'
});

@ObjectType()
export class GroupModel extends DateMixinModel(EmptyClass) {
    @Field(() => Int)
    idx: number;

    @Field(() => String)
    name: string;

    @Field(() => GroupType)
    type: GroupType;

    @Field(() => [ScheduleModel], { nullable: true })
    schedules?: ScheduleModel[];
}
