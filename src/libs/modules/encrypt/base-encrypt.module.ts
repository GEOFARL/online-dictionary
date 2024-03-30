import { compare, hash as genHash, genSalt } from "bcrypt";

import { SALT_ROUNDS } from "./libs/constants/constants.js";
import { type Encrypt } from "./libs/types/types.js";

class BaseEncrypt implements Encrypt {
	private static saltRounds = SALT_ROUNDS;

	private generateSalt(): Promise<string> {
		return genSalt(BaseEncrypt.saltRounds);
	}

	public async compare({
		password,
		passwordHash,
	}: {
		password: string;
		passwordHash: string;
	}): Promise<boolean> {
		return compare(password, passwordHash);
	}

	public async encrypt(password: string): ReturnType<Encrypt["encrypt"]> {
		const salt = await this.generateSalt();
		const hash = await genHash(password, salt);

		return { hash };
	}
}

export { BaseEncrypt };
