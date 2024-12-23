import { Stat } from "src/stats/stats.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({
    name: 'users'
})
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column({ type: 'datetime'})
    createdAt: Date;

    @OneToMany(() => Stat, (stat) => stat.user)
    stats: Stat[];

}