type Encrypt = {
	compare(data: { password: string; passwordHash: string }): Promise<boolean>;

	encrypt(password: string): Promise<{
		hash: string;
	}>;
};

export { type Encrypt };
