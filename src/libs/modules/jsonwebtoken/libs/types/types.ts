type JsonWebToken = {
	decode: (payload: string) => string;
	sign: (payload: string) => string;
};

export { type JsonWebToken };
