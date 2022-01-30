import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

import { DateMixinEntity } from '~/common/entities/DateMixin.entity';
import { PrimaryMixinEntity } from '~/common/entities/PrimaryMixin.entity';
import { ScheduleEntity } from '~/common/entities/scheduler/Schedule.entity';
import { EmptyClass } from '~/common/libs/EmptyClass';

export enum Type {
    USER = 'USER',
    TEAM = 'TEAM'
}

@Entity({ name: 'group_tbl', database: 'scheduler_db' })
export class GroupEntity extends DateMixinEntity(
    PrimaryMixinEntity(EmptyClass)
) {
    @Column({
        type: 'varchar',
        length: 50
    })
    name: string;

    @Column({
        type: 'enum',
        enum: Type,
        default: Type.USER
    })
    type: Type;

    @ManyToMany(() => ScheduleEntity)
    @JoinTable({
        name: 'group_schedule_tbl',
        joinColumn: {
            name: 'group_idx',
            referencedColumnName: 'idx'
        },
        inverseJoinColumn: {
            name: 'schedule_idx',
            referencedColumnName: 'idx'
        }
    })
    schedules: ScheduleEntity[];
}
