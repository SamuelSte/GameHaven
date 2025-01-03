import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Stat } from '../stats.entity';

@Entity('saves')
export class Save {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Stat, (stat) => stat.save, { onDelete: 'CASCADE' })
  stat: Stat;

  @Column('json')
  data: Record<string, any>;
}
