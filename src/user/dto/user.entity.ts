import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  bio: string;

  @Column()
  profile_image: string;

  @Column()
  age: number;

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at :Date
}
