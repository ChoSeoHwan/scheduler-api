import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

import { DateMixinEntity } from '~/common/entities/DateMixin.entity';
import { PrimaryMixinEntity } from '~/common/entities/PrimaryMixin.entity';
import { GroupEntity } from '~/common/entities/scheduler/Group.entity';
import { EmptyClass } from '~/common/libs/EmptyClass';

@Entity({ name: 'schedule_tbl', database: 'scheduler_db' })
export class ScheduleEntity extends DateMixinEntity(
    PrimaryMixinEntity(EmptyClass)
) {
    @Column({ type: 'varchar', length: 200 })
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @ManyToMany(() => GroupEntity)
    @JoinTable({
        name: 'group_schedule_tbl',
        joinColumn: {
            name: 'schedule_idx',
            referencedColumnName: 'idx'
        },
        inverseJoinColumn: {
            name: 'group_idx',
            referencedColumnName: 'idx'
        }
    })
    groups: GroupEntity[];
}
