import {
	type UserAuthResponseDto,
	type UserAuthSignUpRequestDto,
} from "@/modules/user/libs/types/types.js";
import { userSignUp as userSignUpValidationSchema } from "@/modules/user/libs/validation-schemas/validation-schemas.js";

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

const configure = ({ routePath }: { routePath: string }): void => {
	const form = dom.getElement(".form");

	const emailInput = dom.getElement<HTMLInputElement>("#email");
	const fullNameInput = dom.getElement<HTMLInputElement>("#full-name");
	const passwordInput = dom.getElement<HTMLInputElement>("#password");

	form.addEventListener("submit", async (event) => {
		event.preventDefault();

		const inputData: UserAuthSignUpRequestDto = {
			email: emailInput.value,
			fullName: fullNameInput.value,
			password: passwordInput.value,
		};

		try {
			if (
				!(await validation.validate<UserAuthSignUpRequestDto>({
					data: inputData,
					validationSchema: userSignUpValidationSchema,
				}))
			) {
				return;
			}

			const data = await api.post<UserAuthResponseDto>({
				data: inputData,
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
