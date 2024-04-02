import crypto from "crypto";
import fs from "fs";
import path from "path";

import { type ValueOf } from "~/libs/types/types.js";

import { ID_BYTE_LENGTH, STORAGE_NAME } from "./libs/constants/constants.js";
import { TableName } from "./libs/enums/enums.js";
import { type DB, type DBRecord } from "./libs/types/types.js";

class BaseDB implements DB {
	private currentTable: ValueOf<typeof TableName>;

	private filePath: string;

	private ensureFileExists(): void {
		if (!fs.existsSync(this.filePath)) {
			fs.writeFileSync(this.filePath, JSON.stringify([]), "utf-8");
		}
	}

	private getFileContent(): Promise<string> {
		return fs.promises.readFile(this.filePath, "utf-8");
	}

	private setTable(tableName: ValueOf<typeof TableName>) {
		this.currentTable = tableName;
		this.filePath = path.join(
			__dirname,
			STORAGE_NAME,
			`${this.currentTable}.json`,
		);
		this.ensureFileExists();
		return this;
	}

	public getAll<T>(): Promise<DBRecord<T>[] | null> {
		return new Promise<DBRecord<T>[] | null>((resolve) => {
			this.getFileContent()
				.then((fileContent) => {
					resolve(JSON.parse(fileContent));
				})
				.catch(() => resolve(null));
		});
	}

	public insert<T>(object: T): Promise<DBRecord<T> | null> {
		return new Promise<DBRecord<T> | null>((resolve) => {
			const extendedObject: DBRecord<T> = {
				createdAt: new Date().toISOString(),
				id: crypto.randomBytes(ID_BYTE_LENGTH).toString("hex"),
				...object,
			};

			this.getFileContent()
				.then((fileContent) => {
					const data: DBRecord<T>[] = JSON.parse(fileContent);
					data.push(extendedObject);

					fs.writeFile(this.filePath, JSON.stringify(data), "utf-8", (err) => {
						if (err) {
							return resolve(null);
						}
						return resolve(extendedObject);
					});
				})
				.catch(() => {
					resolve(null);
				});
		});
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
