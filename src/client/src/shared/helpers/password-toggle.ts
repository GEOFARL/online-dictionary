import { dom } from "../libs/modules/dom/dom";

const initPasswordToggle = () => {
	const passwordInput = dom.getElement("#password");
	const togglePasswordBtn = dom.getElement("#togglePassword");

	togglePasswordBtn.addEventListener("click", () => {
		const type =
			passwordInput.getAttribute("type") === "password" ? "text" : "password";
		dom.changeAttribute("#password", "type", type);

		// Change the icon based on the password visibility
		if (type === "password") {
			dom.changeAttribute(
				".show-password-icon",
				"src",
				"/icons/eye-closed.svg",
			);
		} else {
			dom.changeAttribute(
				".show-password-icon",
				"src",
				"/icons/eye-visible.svg",
			);
		}
	});
};

export { initPasswordToggle };
