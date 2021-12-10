import "./main.scss"
import "./components/dropDown" 

const body = document.querySelector("body")

window.addEventListener("scroll", setScrollYStyle)
setScrollYStyle()

function setScrollYStyle() {
	body.style.setProperty("--scroll-y", window.scrollY + "px")
}