import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { Constructor } from '~/types/cheat';

export const DateMixinEntity = <Base extends Constructor>(
    constructor: Base
) => {
    abstract class DateEntity extends constructor {
        @CreateDateColumn()
        created_at: Date;

        @UpdateDateColumn()
        updated_at: Date;
    }

    return DateEntity;
};
