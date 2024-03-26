import { FIRST_ARRAY_ELEMENT } from "@/libs/constants/constants.js";
import { type AnyZodObject, ZodError } from "zod";

import { type DOM } from "../dom/dom.js";

class BaseValidation {
	private dom: DOM;

	public constructor({ dom }: { dom: DOM }) {
		this.dom = dom;
	}

	private setUpOnChangeListener(field: string, validationSchema: AnyZodObject) {
		const listener = async (e: InputEvent) => {
			try {
				await validationSchema.pick({ [field]: true }).parseAsync({
					[field]: (e.target as HTMLInputElement).value,
				});
				this.dom.setText({
					selector: `[data-error-${field}]`,
					text: "",
				});
			} catch (error) {
				if (error instanceof ZodError) {
					const [errorMessage] = error.formErrors.fieldErrors[field];

					this.dom.setText({
						selector: `[data-error-${field}]`,
						text: errorMessage,
					});
				}
			}
		};

		this.dom.setListener({
			eventType: "input",
			listener,
			selector: `[data-input-${field}]`,
		});
	}

	private updateErrorMessage(field: string, message: string) {
		this.dom.setText({
			selector: `[data-error-${field}]`,
			text: message,
		});
	}

	public async validate<T>({
		data,
		validationSchema,
	}: {
		data: T;
		validationSchema: AnyZodObject;
	}): Promise<boolean> {
		try {
			await validationSchema.parseAsync(data);
			return true;
		} catch (error) {
			if (error instanceof ZodError) {
				const validationErrors = error.formErrors.fieldErrors;

				Object.entries(validationErrors).forEach((entry) => {
					const [inputField, errors] = entry;

					this.updateErrorMessage(inputField, errors[FIRST_ARRAY_ELEMENT]);
				});
				Object.keys(data).forEach((key) => {
					this.setUpOnChangeListener(key, validationSchema);
				});
			}
			return false;
		}
	}
}

export { BaseValidation };
