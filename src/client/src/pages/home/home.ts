import { api, dom } from "~/shared/index.js";

const configure = (): void => {
	const testAuthButton = dom.getElement(".test-auth");
	const responseContainerSelector = ".response-container";

	testAuthButton.addEventListener("click", async () => {
		try {
			await api.get({ path: "/auth-test" });

			dom.setText({
				selector: responseContainerSelector,
				text: "Тебе автентифіковано",
			});
		} catch (err) {
			dom.setText({
				selector: responseContainerSelector,
				text: "Піди залогінься чи зареєструйся",
			});
		}
	});
};

export { configure };
