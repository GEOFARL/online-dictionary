import pg from "pg";
import { type ConnectionOptions } from "tls";

import { type ValueOf } from "~/libs/types/types.js";

import { type Logger } from "../logger/logger.js";
import { TableName } from "./libs/enums/enums.js";
import { type DB, type DBRecord } from "./libs/types/types.js";

class BaseDB implements DB {
	private client: pg.Client;

	private currentTable: ValueOf<typeof TableName>;

	private logger: Logger;

	public constructor({
		dbConnection: { database, host, password, port, ssl, user },
		logger,
	}: {
		dbConnection: {
			database: string;
			host: string;
			password: string;
			port: number;
			ssl: ConnectionOptions | boolean;
			user: string;
		};
		logger: Logger;
	}) {
		this.logger = logger;
		this.client = new pg.Client({
			database,
			host,
			password,
			port,
			ssl,
			user,
		});

		this.connect();
	}

	private async connect(): Promise<void> {
		await this.client.connect();
		this.logger.info("DB connected successfully");
	}

	private setTable(tableName: ValueOf<typeof TableName>) {
		this.currentTable = tableName;
		return this;
	}

	public async getAll<T>(): Promise<DBRecord<T>[] | null> {
		const result = await this.client.query(
			`SELECT * FROM "${this.currentTable}"`,
		);

		return result.rows;
	}

	public async insert<T>(object: T): Promise<DBRecord<T> | null> {
		const keys = Object.keys(object);
		const values = Object.values(object);

		const ONE_ELEMENT_OFFSET = 1;

		const placeholders = values
			.map((_, i) => `$${i + ONE_ELEMENT_OFFSET}`)
			.join(", ");
		const columns = keys.join(", ");

		const query = `INSERT INTO "${this.currentTable}" (${columns}) VALUES (${placeholders}) RETURNING *`;

		const result = await this.client.query(query, values);
		const [createdObject] = result.rows;
		return createdObject;
	}

	get USER() {
		return this.setTable(TableName.USER);
	}

	get WORD() {
		return this.setTable(TableName.WORD);
	}

	get WORD_OF_THE_DAY() {
		return this.setTable(TableName.WORD_OF_THE_DAY);
	}
}

export { BaseDB };
