import { Entity } from 'typeorm';
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm/index';

@Entity({ name: 'producers' })
export class ProducerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}