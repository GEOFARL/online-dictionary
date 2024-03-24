import { api, dom, notification } from "~/shared/index.js";

const configure = (): void => {
	const testAuthButton = dom.getElement(".test-auth");

	testAuthButton.addEventListener("click", async () => {
		try {
			await api.get({ path: "/auth-test" });
			notification.success("Тебе автентифіковано");
		} catch (err) {
			notification.error("Піди залогінься чи зареєструйся");
		}
	});
};

export { configure };
