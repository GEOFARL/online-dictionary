import dotenv from "dotenv";
import express from "express";

import { logger } from "~/libs/modules/logger/logger.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	logger.info(`The server is started on the port ${port}`);
});
