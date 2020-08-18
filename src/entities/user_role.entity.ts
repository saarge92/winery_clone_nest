import {
  Column,
  CreateDateColumn, DeleteDateColumn,
  Entity, Index,
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

  @ManyToOne(() => User, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Role,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Column({ name: 'user_id', nullable: true, type: 'varchar' })
  @Index()
  user_id: string;

  @Column({ name: 'role_id', nullable: true, type: 'varchar',})
  @Index()
  role_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}