import { Field, ObjectType } from '@nestjs/graphql';

import { Constructor } from '~/types/cheat';

export const DateMixinModel = <Base extends Constructor>(base: Base) => {
    @ObjectType()
    abstract class DateModel extends base {
        @Field(() => Date)
        created_at: Date;

        @Field(() => Date)
        updated_at: Date;
    }

    return DateModel;
};
