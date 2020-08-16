import {
  Column,
  CreateDateColumn, DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm/index';
import { User } from './user.entity';
import { Role } from './role.entity';

@Entity({ name: 'user_in_roles' })
export class UserRole {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => User,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE', eager: false })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(type => Role, { onUpdate: 'CASCADE', onDelete: 'SET NULL', eager: false })
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  role: Role;

  @Column({ name: 'user_id', nullable: true })
  user_id: string;


  @Column({ name: 'role_id', nullable: true })
  role_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}