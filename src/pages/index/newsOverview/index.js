import Swiper, {Navigation} from 'swiper';
import "swiper/css"

Swiper.use([Navigation])
const swiper = new Swiper(".js-news-overview-slider", {
	slidesPerView: 3,
	spaceBetween: 30,
	freeMode: true,
	loop: true,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
})