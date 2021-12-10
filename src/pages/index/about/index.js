import Playable from "playable"
import video from "./about.mp4"
import poster from "./about-poster.jpg"

const videoWrapper = document.querySelector(".js-about-video")
const aboutVideo = videoWrapper.parentNode

document.addEventListener("DOMContentLoaded", function() {
	const config = {
		poster: poster,
		width: 580,
		height: 326,
		src: [video, "https://youtu.be/XG9ENjzPv1k"],
		volume: 30,
		fillAllSpace: true,
	}
	const player = Playable.create(config)
	player.attachToElement(videoWrapper)
	setVideoSize()
	
})
window.addEventListener("resize", setVideoSize)

function setVideoSize() {
	const width = window.getComputedStyle(aboutVideo).getPropertyValue("width")
	videoWrapper.style.width = width
	videoWrapper.style.height = parseFloat(width) * 0.562 + "px"
}