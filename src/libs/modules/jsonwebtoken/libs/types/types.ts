type JsonWebToken = {
	sign: (payload: string) => string;
};

export { type JsonWebToken };
