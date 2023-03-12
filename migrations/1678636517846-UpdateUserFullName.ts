import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserFullName1678636517846 implements MigrationInterface {
    name = 'UpdateUserFullName1678636517846'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "fullName" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "fullName"`);
    }

}
