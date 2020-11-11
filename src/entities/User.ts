import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column()
  login: string;

  @Column({ default: null })
  password: string;
}
