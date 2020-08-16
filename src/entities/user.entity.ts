import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity, JoinTable,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm/index';
import { Role } from './role.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false, length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  name: string;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  password: string;

  @JoinTable({
    name: 'user_in_roles', joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  roles: Role[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}