import { type UserAuthResponseDto } from "@/modules/user/user.js";

import {
	AppRoute,
	Cookie,
	api,
	cookies,
	dom,
	navigation,
} from "~/shared/index.js";

const configure = ({ routePath }: { routePath: string }): void => {
	const form = dom.getElement(".form");

	const emailInput = dom.getElement<HTMLInputElement>("#email");
	const fullNameInput = dom.getElement<HTMLInputElement>("#full-name");
	const passwordInput = dom.getElement<HTMLInputElement>("#password");

	form.addEventListener("submit", async (event) => {
		event.preventDefault();

		try {
			const data = await api.post<UserAuthResponseDto>({
				data: {
					email: emailInput.value,
					fullName: fullNameInput.value,
					password: passwordInput.value,
				},
				path: routePath,
			});

			if (!("status" in data)) {
				cookies.set(Cookie.TOKEN, data.token);
				navigation.navigate(AppRoute.ROOT);
			}
		} catch (err) {
			// eslint-disable-next-line no-console
			console.log("error");
		}
	});
};

export { configure };
