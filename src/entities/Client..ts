import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToMany,
} from 'typeorm';
import { Banker } from './Banker';
import { Transaction } from './Transaction';
import { Person } from './utils/Person';

@Entity('client')
export class Client extends Person {
    @Column({
        type: 'numeric',
    })
    balance: number;

    @Column({
        name: 'active',
        default: true,
    })
    is_active: boolean;

    @Column({
        type: 'simple-json',
        nullable: true,
    })
    additional_info: {
        age: number;
        hair_color: string;
    };

    @OneToMany(() => Transaction, transaction => transaction.client)
    transactions: Transaction[]

    @ManyToMany(() => Banker)
    bankers: Banker[]

    @Column({ type: 'simple-array', default: [] })
    family_members: string[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}