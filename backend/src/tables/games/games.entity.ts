import { Stat } from "src/tables/stats/stats.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({
    name: 'games'
})
export class Game {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    category: string;

    @OneToMany(() => Stat, (stat) => stat.game)
    stats: Stat[];

}