import { dom } from "../modules/dom/dom.js";

const handleMobileSidebar = () => {
	dom.setListener({
		eventType: "click",
		listener: () => {
			dom.addClassName({
				className: "is-open",
				selector: ".mobile-sidebar-backdrop",
			});
		},
		selector: ".header__open-sidebar-button",
	});
	dom.setListener({
		eventType: "click",
		listener: () => {
			dom.removeClassName({
				className: "is-open",
				selector: ".mobile-sidebar-backdrop",
			});
		},
		selector: ".sidebar__close-button",
	});
};

export { handleMobileSidebar };
