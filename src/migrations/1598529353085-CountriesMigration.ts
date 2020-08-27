import { MigrationInterface, QueryRunner } from 'typeorm';

export class CountriesMigration1598529353085 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE \`countries\` (
        \`id\` varchar(36) NOT NULL,
        \`name_rus\` varchar(255) NOT NULL,
        \`name_en\` varchar(255) DEFAULT NULL,
        \`created_at\` datetime(6) NOT NULL DEFAULT current_timestamp(6),
        \`updated_at\` datetime(6) NOT NULL DEFAULT current_timestamp(6),
        \`deleted_at\` datetime(6) DEFAULT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE countries`);
  }

}
