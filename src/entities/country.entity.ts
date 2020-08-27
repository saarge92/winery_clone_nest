import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm/index';

@Entity()
export class Country {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', width: 255, name: 'name_rus', nullable: false })
  nameRus: string;

  @Column({ type: 'varchar', width: 255, nullable: true, name: 'name_en' })
  nameEn: string;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}