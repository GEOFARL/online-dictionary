import {
	configureMobileSidebar,
	dom,
	partOfSpeechToClassName,
} from "~/shared/index.js";

const configure = ({ partOfTheSpeech }: { partOfTheSpeech: string }): void => {
	dom.addClassName({
		className: partOfSpeechToClassName[partOfTheSpeech],
		selector: ".badge",
	});
};

configureMobileSidebar();

export { configure };
