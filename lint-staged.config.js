module.exports = {
	"*": [
		() => "npm run lint:js",
		() => "npm run lint:format",
		() => "npm run lint:trash",
		() => "npm run lint:fs",
	],
};
