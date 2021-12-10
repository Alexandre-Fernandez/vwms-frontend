import Swiper, { Navigation, Pagination } from 'swiper';
import "swiper/css"

Swiper.use([Navigation])
const swiper = new Swiper(".js-media-slider", {
	slidesPerView: 5,
	spaceBetween: 20,
	freeMode: true,
	loop: true,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
})