import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnsToUsers1739939999999 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE users 
            ADD COLUMN firstName VARCHAR NOT NULL,
            ADD COLUMN lastName VARCHAR NULL,
            ADD COLUMN dob DATE NULL,
            ADD COLUMN phoneNumber VARCHAR NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE users 
            DROP COLUMN firstName,
            DROP COLUMN lastName,
            DROP COLUMN dob,
            DROP COLUMN phoneNumber
        `);
    }
}
