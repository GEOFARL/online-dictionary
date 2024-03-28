import { dom } from "../modules/dom/dom.js";

const initPasswordToggle = () => {
	dom.setListener({
		eventType: "click",
		listener: () => {
			const type =
				dom.getAttribute({
					attribute: "type",
					selector: "#password",
				}) === "password"
					? "text"
					: "password";
			// Change the icon based on the password visibility
			if (type === "password") {
				dom.changeAttribute({
					attribute: "type",
					selector: "#password",
					value: "password",
				});
				dom.changeAttribute({
					attribute: "src",
					selector: ".show-password-icon",
					value: "/icons/eye-closed.svg",
				});
			} else {
				dom.changeAttribute({
					attribute: "type",
					selector: "#password",
					value: "text",
				});
				dom.changeAttribute({
					attribute: "src",
					selector: ".show-password-icon",
					value: "/icons/eye-visible.svg",
				});
			}
		},
		selector: "#toggle-password",
	});
};

export { initPasswordToggle };
