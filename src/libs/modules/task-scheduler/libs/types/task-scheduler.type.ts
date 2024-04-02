type TaskScheduler = {
	schedule: (cronExpression: string, callback: () => void) => void;
};

export { type TaskScheduler };
