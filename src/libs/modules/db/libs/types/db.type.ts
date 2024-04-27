import { type TableName } from "../enums/enums.js";
import { type DBRecord } from "./db-record.type.js";

type DB = {
	delete: (id: number) => Promise<boolean>;
	getAll: <T>() => Promise<DBRecord<T>[] | null>;
	insert: <T>(object: T) => Promise<DBRecord<T> | null>;
	update: <T>(id: number, object: T) => Promise<DBRecord<T> | null>;
} & {
	[K in keyof typeof TableName]: DB;
};

export { type DB };
