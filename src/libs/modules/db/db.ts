import { BaseDB } from "./base-db.module.js";

const db = new BaseDB();

export { db };
export { type DB, type DBRecord } from "./libs/types/types.js";
