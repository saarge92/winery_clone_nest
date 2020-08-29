import {
  Column,
  CreateDateColumn, DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm/index';
import { Country } from './country.entity';
import { Color } from './color.entity';
import { Sweet } from './sweet.entity';
import { ProducerEntity } from './producer.entity';

@Entity('vines')
export class Vine {
  @PrimaryColumn({
    type: 'varchar',
    width: 255,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'name_rus',
    type: 'varchar',
    width: 255,
    nullable: false,
  })
  nameRus: string;

  @Column({
    name: 'name_en',
    type: 'varchar',
    width: 255,
    nullable: true,
  })
  nameEn: string;

  @Column({
    name: 'price',
    type: 'double',
    precision: 20,
    scale: 2,
    nullable: false,
  })
  price: number;

  @Column({
    name: 'price_cup',
    type: 'double',
    precision: 20,
    scale: 2,
    nullable: true,
  })
  priceCup: number;

  @Column({
    name: 'volume',
    type: 'double',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  volume: number;

  @Column({
    name: 'year',
    type: 'integer',
    nullable: true,
  })
  year: number;

  @Column({
    name: 'strength',
    type: 'double',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  strength: number;

  @Column({
    name: 'sort_contain',
    type: 'text',
    nullable: true,
  })
  sort_contain: string;

  @ManyToOne(() => Country, {
    onDelete: 'SET NULL', onUpdate: 'CASCADE',
    lazy: true,
  })
  @JoinColumn({ name: 'country_id' })
  country: Promise<Country>;

  @Column({ name: 'country_id', type: 'varchar', nullable: true })
  country_id: string;

  @ManyToOne(() => Color, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    lazy: true,
  })
  @JoinColumn({ name: 'color_id' })
  color: Promise<Color>;

  @Column({
    name: 'color_id',
    type: 'varchar',
    nullable: true,
  })
  color_id: string;

  @ManyToOne(() => Sweet, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    lazy: true,
  })
  @JoinColumn({ name: 'sweet_id' })
  sweet: Promise<Sweet>;

  @Column({
    name: 'sweet_id',
    type: 'varchar',
    nullable: true,
  })
  sweet_id: string;

  @ManyToOne(() => ProducerEntity, {
    lazy: true,
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'producer_id' })
  producer: Promise<ProducerEntity>;

  @Column({
    name: 'producer_id',
    type: 'varchar',
    nullable: true,
  })
  producer_id: string;

  @Column({ name: 'image_src', width: 255, nullable: true })
  image_src: string;

  @Column({ type: 'boolean' })
  is_coravin: boolean;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}