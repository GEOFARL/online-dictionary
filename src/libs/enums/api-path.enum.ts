const ApiPath = {
	AUTH_LOG_OUT: "/auth/log-out",
	AUTH_SIGN_IN: "/auth/sign-in",
	AUTH_SIGN_UP: "/auth/sign-up",
	USER: "/user",
	WORDS_$WORD: "/words/:word",
} as const;

export { ApiPath };
