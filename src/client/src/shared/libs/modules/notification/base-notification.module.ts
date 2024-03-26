import { Notyf } from "notyf";
import "notyf/notyf.min.css";

import { type Notification } from "./libs/types/types.js";

class BaseNotification implements Notification {
	private notification: Notyf;

	public constructor() {
		this.notification = new Notyf({
			dismissible: true,
			duration: 2000,
			position: {
				x: "right",
				y: "top",
			},
			ripple: false,
		});
	}

	public error(message: string) {
		this.notification.error(message);
	}

	public success(message: string) {
		this.notification.success(message);
	}
}

export { BaseNotification };
