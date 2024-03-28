import {
	type UserAuthResponseDto,
	type UserAuthSignInRequestDto,
	userSignInValidationSchema,
} from "@/modules/user/user.js";

import {
	AppRoute,
	Cookie,
	api,
	cookies,
	dom,
	initPasswordToggle,
	navigation,
	notification,
	validation,
} from "~/shared/index.js";

const configure = ({ routePath }: { routePath: string }) => {
	const form = dom.getElement(".form");

	const emailInput = dom.getElement<HTMLInputElement>("#email");
	const passwordInput = dom.getElement<HTMLInputElement>("#password");

	form.addEventListener("submit", async (event) => {
		event.preventDefault();
		const inputData: UserAuthSignInRequestDto = {
			email: emailInput.value,
			password: passwordInput.value,
		};

		try {
			if (
				!(await validation.validate<UserAuthSignInRequestDto>({
					data: inputData,
					validationSchema: userSignInValidationSchema,
				}))
			) {
				return;
			}

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
			} else if ("message" in data) {
				notification.error(data.message as string);
			}
		} catch (error) {
			if (error instanceof Error) {
				notification.error(error.message);
			}
		}
	});
};

initPasswordToggle();

export { configure };
