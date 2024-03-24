import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { Notification } from "./libs/types/types.js";

class BaseNotification implements Notification {
	private notification: Notyf;

	public constructor() {
		this.notification = new Notyf({
			duration: 2000,
			position: {
				x: "right",
				y: "top",
			},
			ripple: false,
			dismissible: true,
		});
	}

	public success(message: string) {
		this.notification.success(message);
	}

	public error(message: string) {
		this.notification.error(message);
	}
}

export { BaseNotification };
