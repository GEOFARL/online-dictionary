const ApiPath = {
	AUTH_LOG_OUT: "/auth/log-out",
	AUTH_SIGN_IN: "/auth/sign-in",
	AUTH_SIGN_UP: "/auth/sign-up",
	USER: "/user",
	WORDS_$WORD: "/words/:word",
	WORDS_$WORD_LIKE: "/words/:word/like",
	WORDS_$WORD_UNLIKE: "/words/:word/unlike",
	WORDS_FAVORITES: "/words/favorites",
} as const;

export { ApiPath };
