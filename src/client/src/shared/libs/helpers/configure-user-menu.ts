import { HIDDEN_CLASS } from "../constants/constants.js";
import { dom } from "../modules/dom/dom.js";

const configureUserMenu = () => {
	const avatarButton = dom.getElement(".avatar-button");
	const userMenuContainer = dom.getElement(".user-menu-container");

	dom.setListener({
		eventType: "click",
		listener: () => {
			if (userMenuContainer.classList.contains(HIDDEN_CLASS)) {
				dom.removeClassName({
					className: HIDDEN_CLASS,
					selector: ".user-menu-container",
				});
			}
		},
		selector: ".avatar-button",
	});

	dom.setListener({
		eventType: "click",
		listener: (event: MouseEvent) => {
			if (
				!userMenuContainer.classList.contains(HIDDEN_CLASS) &&
				!avatarButton.contains(event.target as Node) &&
				!userMenuContainer.contains(event.target as Node)
			) {
				dom.addClassName({
					className: HIDDEN_CLASS,
					selector: ".user-menu-container",
				});
			}
		},
		selector: "body",
	});
};

export { configureUserMenu };
