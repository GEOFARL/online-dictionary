import cron from "node-cron";

import { type TaskScheduler } from "./libs/types/types.js";

class BaseTaskScheduler implements TaskScheduler {
	public schedule(cronExpression: string, callback: () => void): void {
		cron.schedule(cronExpression, callback);
	}
}

export { BaseTaskScheduler };
