import { MigrationInterface, QueryRunner } from "typeorm";

export class StoreCategoryAdmin1682018556767 implements MigrationInterface {
    name = 'StoreCategoryAdmin1682018556767'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP DEFAULT '2023-04-20T19:22:37.281Z', "updated_at" TIMESTAMP, "created_by_customer_id" TIMESTAMP, "created_by_admin_id" TIMESTAMP, "name" character varying NOT NULL, "description" text NOT NULL, "store_id" uuid, "parent_id" uuid, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "store" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP DEFAULT '2023-04-20T19:22:37.281Z', "updated_at" TIMESTAMP, "created_by_customer_id" TIMESTAMP, "created_by_admin_id" TIMESTAMP, "name" character varying NOT NULL, "description" text, CONSTRAINT "PK_f3172007d4de5ae8e7692759d79" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "admin" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP DEFAULT '2023-04-20T19:22:37.281Z', "updated_at" TIMESTAMP, "created_by_customer_id" TIMESTAMP, "created_by_admin_id" TIMESTAMP, "email" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying NOT NULL, "role" character varying NOT NULL, CONSTRAINT "UQ_de87485f6489f5d0995f5841952" UNIQUE ("email"), CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_9d0921940cddedc4eb5db92871d" FOREIGN KEY ("store_id") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_1117b4fcb3cd4abb4383e1c2743" FOREIGN KEY ("parent_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_1117b4fcb3cd4abb4383e1c2743"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_9d0921940cddedc4eb5db92871d"`);
        await queryRunner.query(`DROP TABLE "admin"`);
        await queryRunner.query(`DROP TABLE "store"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
