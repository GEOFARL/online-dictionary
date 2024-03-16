import dotenv from "dotenv";
import express from "express";

import { config } from "~/libs/modules/config/config.js";
import { logger } from "~/libs/modules/logger/logger.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(config.ENV.APP.PORT, config.ENV.APP.HOST, () => {
	logger.info(
		`The server is started on ${config.ENV.APP.HOST}${config.ENV.APP.PORT}`,
	);
});
