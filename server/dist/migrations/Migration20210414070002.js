"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20210414070002 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20210414070002 extends migrations_1.Migration {
    up() {
        return __awaiter(this, void 0, void 0, function* () {
            this.addSql('alter table "post" add column "id" serial primary key, add column "created_at" timestamptz(0) not null, add column "updated_at" timestamptz(0) not null, add column "title" text not null;');
            this.addSql('drop table if exists "graph"."graph" cascade;');
        });
    }
}
exports.Migration20210414070002 = Migration20210414070002;
//# sourceMappingURL=Migration20210414070002.js.map