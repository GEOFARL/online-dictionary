import { dom } from "../modules/dom/dom.js";

const configureMobileSidebar = () => {
	dom.setListener({
		eventType: "click",
		listener: () => {
			dom.addClassName({
				className: "is-open",
				selector: ".mobile-sidebar-backdrop",
			});
		},
		selector: ".sidebar-button",
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

	dom.setListener({
		eventType: "click",
		listener: () => {
			dom.removeClassName({
				className: "is-open",
				selector: ".mobile-sidebar-backdrop",
			});
		},
		selector: ".mobile-sidebar-backdrop",
	});
};

export { configureMobileSidebar };
