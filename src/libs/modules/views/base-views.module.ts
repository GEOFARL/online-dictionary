import path from "path";

import { type Application } from "~/libs/types/types.js";

class BaseViews {
	public init(app: Application) {
		app.set("view engine", "ejs");
		app.set("views", path.join(path.resolve(), "src/views"));
	}
}

export { BaseViews };
