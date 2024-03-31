import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const swiper = new Swiper(".swiper", {
	allowSlideNext: true,
	allowSlidePrev: true,
	loop: true,
	modules: [Navigation],
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
});

export { swiper };
