import {MigrationInterface, QueryRunner} from "typeorm";

export class addReception1637650732996 implements MigrationInterface {
    name = 'addReception1637650732996'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`m_reception_work\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`created_at\` timestamp(0) NOT NULL DEFAULT NOW(), \`updated_at\` timestamp(0) NOT NULL DEFAULT NOW() ON UPDATE NOW(), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`t_reception\` (\`id\` int NOT NULL AUTO_INCREMENT, \`result\` text NOT NULL, \`created_at\` timestamp(0) NOT NULL DEFAULT NOW(), \`updated_at\` timestamp(0) NOT NULL DEFAULT NOW() ON UPDATE NOW(), \`reception_work_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`t_reception\` ADD CONSTRAINT \`FK_bdffff197eb9bfafb7711f402bb\` FOREIGN KEY (\`reception_work_id\`) REFERENCES \`m_reception_work\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`t_reception\` DROP FOREIGN KEY \`FK_bdffff197eb9bfafb7711f402bb\``);
        await queryRunner.query(`DROP TABLE \`t_reception\``);
        await queryRunner.query(`DROP TABLE \`m_reception_work\``);
    }

}
