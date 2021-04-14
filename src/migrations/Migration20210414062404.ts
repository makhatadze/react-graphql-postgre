import { Migration } from '@mikro-orm/migrations';

export class Migration20210414062404 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "post" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" text not null);');

    this.addSql('drop table if exists "graph" cascade;');

    this.addSql('drop table if exists "my_table" cascade;');
  }

}
