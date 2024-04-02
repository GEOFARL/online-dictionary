module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		"airbnb-base",
		"plugin:import/recommended",
		"plugin:perfectionist/recommended-natural",
		"plugin:@typescript-eslint/recommended",
		"prettier",
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
		"import",
		"perfectionist",
		"sonarjs",
		"unicorn",
		"@typescript-eslint",
		"prettier",
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
		"arrow-body-style": "off",
		"import/order": "off",
		"no-return-await": "off",
	},
	ignorePatterns: [
		"build",
		".eslintrc.cjs",
		"lint-staged.config.cjs",
		"commitlint.config.cjs",
		"dangerfile.ts",
		"project.config.ts",
		"*.ejs",
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
	parserOptions: {
		project: ["./src/client/tsconfig.json", "./tsconfig.json"],
	},
};
