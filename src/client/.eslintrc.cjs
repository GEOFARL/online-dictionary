module.exports = {
	"settings": {
		"import/resolver": {
			"alias": {
				"map": [["~", "./src"]],
				"extensions": [".js", ".json", ".ts"],
			},
		},
	},
	"rules": {
		"import/no-unresolved": "off",
	},
	"ignorePatterns": ["webpack.config.mjs", "public/**/*.js"],
};
