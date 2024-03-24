import { type UserAuthResponseDto } from "@/modules/user/user.js";

import {
	AppRoute,
	Cookie,
	api,
	cookies,
	dom,
	navigation,
} from "~/shared/index.js";

const configure = ({ routePath }: { routePath: string }) => {
	const form = dom.getElement(".form");

	const emailInput = dom.getElement<HTMLInputElement>("#email");
	const passwordInput = dom.getElement<HTMLInputElement>("#password");

	form.addEventListener("submit", async (event) => {
		event.preventDefault();

		try {
			const data = await api.post<UserAuthResponseDto>({
				data: {
					email: emailInput.value,
					password: passwordInput.value,
				},
				path: routePath,
			});

			if (!("status" in data)) {
				cookies.set(Cookie.TOKEN, data.token);
				navigation.navigate(AppRoute.ROOT);
			}
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error);
		}
	});
};

export { configure };
