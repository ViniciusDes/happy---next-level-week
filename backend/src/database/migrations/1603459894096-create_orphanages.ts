import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrphanages1603459894096 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: "orphanages",
        columns:[
          {
            name: "id",
            type: "integer",
            unsigned: true,//so inicia com numero positivo
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
            isUnique: true,

          },
          {
            name: "name",
            type: "varchar"
          },
          {
            name: "latitude",
            type: "decimal",
            scale: 10,//numero antes da virgula
            precision: 2,//numero depois da virgula
          },
          {
            name: "longitude",
            type: "decimal",
            scale: 10,//numero antes da virgula
            precision: 2,//numero depois da virgula
          },
          {
            name: "about",
            type: "text",
            isNullable: true,
             
          },
          {
            name: "instructions",
            type: "text",
             
          },
          {
            name:"opening_hours",
            type: "varchar"
          },
          {
            name: "open_on_weekends",
            type: "boolean",
            default: false
             
          },

        ],
      })) 
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("orphanages");
    }

}
