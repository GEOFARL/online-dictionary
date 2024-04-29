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

	public async delete(id: number): Promise<boolean> {
		try {
			await this.client.query("BEGIN");
			const query = `DELETE FROM "${this.currentTable}" WHERE "id" = $1`;
			const result = await this.client.query(query, [id]);
			await this.client.query("COMMIT");

			return Boolean(result);
		} catch (error) {
			await this.client.query("ROLLBACK");

			this.logger.error("Transaction failed on delete", error);
			return false;
		}
	}

	public async getAll<T>(): Promise<DBRecord<T>[] | null> {
		const result = await this.client.query(
			`SELECT * FROM "${this.currentTable}"`,
		);

		return result.rows;
	}

	public async insert<T>(object: T): Promise<DBRecord<T> | null> {
		try {
			await this.client.query("BEGIN");

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

			await this.client.query("COMMIT");

			return createdObject;
		} catch (error) {
			await this.client.query("ROLLBACK");

			this.logger.error("Transaction failed on insert", error);
			return null;
		}
	}

	public async update<T>(id: number, object: T): Promise<DBRecord<T> | null> {
		try {
			await this.client.query("BEGIN");

			const keys = Object.keys(object);
			const values = Object.values(object);

			const ONE_ELEMENT_OFFSET = 1;
			const placeholders = values.map((_, i) => `$${i + ONE_ELEMENT_OFFSET}`);

			const query = `UPDATE "${this.currentTable}" SET ${keys.map(
				(key, index) => `"${key}" = ${placeholders[index]}`,
			)} WHERE "id" = $${placeholders.length + ONE_ELEMENT_OFFSET} RETURNING *`;

			const result = await this.client.query(query, [...values, id]);
			const [updatedObject] = result.rows;

			await this.client.query("COMMIT");
			return updatedObject;
		} catch (error) {
			await this.client.query("ROLLBACK");

			this.logger.error("Transaction failed on update", error);
			return null;
		}
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
