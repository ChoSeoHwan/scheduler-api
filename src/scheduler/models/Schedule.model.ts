import { Field, Int, ObjectType } from '@nestjs/graphql';

import { EmptyClass } from '~/common/libs/EmptyClass';
import { DateMixinModel } from '~/common/models/DateMixin.model';
import { GroupModel } from '~/scheduler/models/Group.model';

@ObjectType()
export class ScheduleModel extends DateMixinModel(EmptyClass) {
    @Field(() => Int)
    idx: number;

    @Field(() => String)
    title: string;

    @Field(() => String)
    description: string;

    @Field(() => [GroupModel], { nullable: true })
    groups?: GroupModel[];
}
