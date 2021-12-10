import Swiper, {Pagination, Navigation} from "swiper";
import "swiper/css"
import "swiper/css/pagination"
//import "swiper/css/navigation" breaks other navs styling
import coliminder from "../../../assets/images/coliminder.svg"

const listedProducts = ["CMI-02", "CMI-02-LE", "CMI-02-ERU"].map(p => `<span>Coliminder</span> <span>${p}</span>`)

Swiper.use([Pagination, Navigation])
const swiper = new Swiper(".js-product-overview__swiper", {
	autoHeight: true,
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
		renderBullet: function (index, className) {
			return `<button class="${className}">
				<img src="${coliminder}" alt="ColiMinder logo"/>
				${listedProducts[index]}
			</button>`
		}
	}
})