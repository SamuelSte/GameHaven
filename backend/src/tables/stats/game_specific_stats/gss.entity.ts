import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Stat } from '../stats.entity';

@Entity('game_specific_stats')
export class GameSpecificStat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Stat, (stat) => stat.gameSpecificStats, { onDelete: 'CASCADE' })
  stat: Stat;

  @Column('json')
  data: Record<string, any>;
}
