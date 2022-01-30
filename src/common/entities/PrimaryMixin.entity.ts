import { PrimaryGeneratedColumn } from 'typeorm';

import { Constructor } from '~/types/cheat';

export const PrimaryMixinEntity = <Base extends Constructor>(
    constructor: Base
) => {
    abstract class PrimaryEntity extends constructor {
        @PrimaryGeneratedColumn()
        idx: number;
    }

    return PrimaryEntity;
};
