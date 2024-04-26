import { ApiPath } from "@/libs/enums/enums.js";
import {
	type UserDto,
	type UserProfileUpdateRequestDto,
} from "@/modules/user/libs/types/types.js";
import { userProfileUpdate as userProfileUpdateValidationSchema } from "@/modules/user/libs/validation-schemas/user-profile-update.validation-schema.js";

import {
	NotificationMessage,
	api,
	configureMobileSidebar,
	configureUserMenu,
	dom,
	notification,
	validation,
} from "~/shared/index.js";

const configure = (): void => {
	configureMobileSidebar();
	configureUserMenu();

	const form = dom.getElement(".profile-update-form");

	const fullNameInput = dom.getElement<HTMLInputElement>("#change-name");

	form.addEventListener("submit", async (event) => {
		event.preventDefault();

		const inputData: UserProfileUpdateRequestDto = {
			fullName: fullNameInput.value,
		};

		try {
			if (
				!(await validation.validate<UserProfileUpdateRequestDto>({
					data: inputData,
					validationSchema: userProfileUpdateValidationSchema,
				}))
			) {
				return;
			}

			const data = await api.put<UserDto>({
				data: inputData,
				path: ApiPath.USER,
			});

			if (!("status" in data)) {
				notification.success(NotificationMessage.PROFILE_UPDATE_SUCCESS);
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

export { configure };
