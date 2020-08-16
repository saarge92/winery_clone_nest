import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserMigration1597562453255 implements MigrationInterface {
  name = 'UserMigration1597562453255';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        
    CREATE TABLE \`users\` (
      \`id\` varchar(36) NOT NULL PRIMARY KEY,
      \`email\` varchar(255) NOT NULL unique,
      \`name\` varchar(255) NOT NULL,
      \`password\` varchar(255) NOT NULL,
      \`created_at\` datetime(6) NOT NULL DEFAULT current_timestamp(6),
      \`updated_at\` datetime(6) NOT NULL DEFAULT current_timestamp(6),
      \`deleted_at\` datetime(6) DEFAULT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE users
    `);
  }

}
