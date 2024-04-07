import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const swiper = new Swiper(".images-slider", {
	allowSlideNext: true,
	allowSlidePrev: true,
	loop: true,
	modules: [Navigation],
	navigation: {
		nextEl: ".images-slider .swiper-button-next",
		prevEl: ".images-slider .swiper-button-prev",
	},
});

const swiperMobile = new Swiper(".images-slider-mobile", {
	allowSlideNext: true,
	allowSlidePrev: true,
	loop: true,
	modules: [Navigation],
	navigation: {
		nextEl: ".images-slider-mobile .swiper-button-next",
		prevEl: ".images-slider-mobile .swiper-button-prev",
	},
});

export { swiper, swiperMobile };
