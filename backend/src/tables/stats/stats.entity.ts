import { Game } from "src/tables/games/games.entity";
import { User } from "src/tables/users/users.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { GameSpecificStat } from "./game_specific_stats/gss.entity";


@Entity('stats')
export class Stat {
    
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.stats, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Game, (game) => game.stats, { onDelete: 'CASCADE' })
  game: Game;

  @Column()
  difficulty: string;

  @Column({ default: 0 })
  gamesPlayed: number;

  @Column({ default: 0 })
  gamesWon: number;

  @Column({ nullable: true, type: 'datetime' })
  lastPlayed: Date;

  @OneToMany(() => GameSpecificStat, (gameSpecificStat) => gameSpecificStat.stat)
  gameSpecificStats: GameSpecificStat[];
}
