import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: string;

  @Column({ unique: true })
  uuid: string;

  @Column()
  body: string;

  @Column({ default: false })
  completed: boolean;

  @Column({ default: false })
  discarded: boolean;

  @Column({ default: '' })
  comment: string;

  @Column({ default: null })
  parentUuid: string;
}
