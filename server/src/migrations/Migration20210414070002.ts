import { Migration } from '@mikro-orm/migrations';

export class Migration20210414070002 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "post" add column "id" serial primary key, add column "created_at" timestamptz(0) not null, add column "updated_at" timestamptz(0) not null, add column "title" text not null;');

    this.addSql('drop table if exists "graph"."graph" cascade;');
  }

}
