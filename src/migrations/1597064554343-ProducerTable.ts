import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProducerTable1597064554343 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE \`producerss\` (
      \`id\` varchar(36) NOT NULL PRIMARY KEY,
      \`name\` varchar(255) NOT NULL,
      \`created_at\` datetime(6) NOT NULL DEFAULT current_timestamp(6),
      \`updated_at\` datetime(6) NOT NULL DEFAULT current_timestamp(6),
      \`deleted_at\` datetime(6) DEFAULT NULL)
       ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
