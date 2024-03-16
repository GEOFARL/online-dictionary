module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		"prettier",
		"airbnb-base",
		"plugin:import/recommended",
		"plugin:perfectionist/recommended-natural",
		"plugin:@typescript-eslint/recommended",
	],
	overrides: [
		{
			env: {
				node: true,
			},
			files: [".eslintrc.{js,cjs}"],
			parserOptions: {
				sourceType: "script",
			},
		},
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		project: "./tsconfig.json",
	},
	plugins: [
		"prettier",
		"import",
		"perfectionist",
		"sonarjs",
		"unicorn",
		"@typescript-eslint",
	],
	rules: {
		"prettier/prettier": ["error"],

		"import/no-unresolved": "error",
		"import/exports-last": ["error"],
		"import/extensions": [
			"error",
			{
				js: "always",
			},
		],
		"import/newline-after-import": ["error"],
		"import/no-default-export": ["error"],
		"import/prefer-default-export": ["off"],
		"import/no-duplicates": ["error"],

		"perfectionist/sort-interfaces": "error",

		"@typescript-eslint/consistent-type-exports": ["error"],
		"@typescript-eslint/consistent-type-imports": [
			"error",
			{
				fixStyle: "inline-type-imports",
			},
		],
		"@typescript-eslint/no-magic-numbers": [
			"error",
			{
				ignoreEnums: true,
				ignoreReadonlyClassProperties: true,
			},
		],
		"@typescript-eslint/return-await": ["error", "always"],

		"quotes": ["error", "double", { "allowTemplateLiterals": true }],
		"indent": ["error", "tab"],
		"no-tabs": "off",
		"class-methods-use-this": "off",
	},
	ignorePatterns: [
		"build",
		".eslintrc.js",
		"lint-staged.config.js",
		"commitlint.config.js",
		"dangerfile.ts",
		"project.config.ts",
	],
	settings: {
		"import/parsers": {
			"@typescript-eslint/parser": [".ts", ".tsx"],
		},
		"import/resolver": {
			typescript: true,
			node: true,
		},
	},
};
