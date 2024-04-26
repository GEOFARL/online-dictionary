import { configureMobileSidebar, configureUserMenu } from "~/shared/index.js";

const configure = (): void => {
	configureMobileSidebar();
	configureUserMenu();
};

export { configure };
