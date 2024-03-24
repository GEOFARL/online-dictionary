import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export default {
	entry: generateEntryPoints(),
	mode: "production",
	module: {
		rules: [
			{
				exclude: /node_modules/,
				test: /\.ts?$/,
				use: [
					{
						loader: "ts-loader",
						options: {
							configFile: "tsconfig.json",
						},
					},
				],
			},
		],
	},
	output: {
		clean: true,
		filename: "[name].js",
		path: path.resolve(__dirname, "public", "js"),
		library: "Library",
	},
	resolve: {
		alias: {
			"~": path.join(__dirname, "src/"),
			"@": path.join(__dirname, ".."),
		},
		extensionAlias: {
			".js": [".js", ".ts"],
		},
		extensions: [".ts", ".js"],
	},
	target: "web",
};

function generateEntryPoints() {
	const entries = {};
	const pagesDir = path.join(__dirname, "src", "pages");
	const pageDirs = fs.readdirSync(pagesDir);

	for (const dir of pageDirs) {
		const fullPath = path.join(pagesDir, dir);
		const entryFile = path.join(fullPath, `${dir}.ts`);

		if (fs.existsSync(entryFile)) {
			entries[dir] = entryFile;
		}
	}

	return entries;
}
