const landingWater = {
	landing: document.querySelector(".landing"),
	originalScrenWidth: 1920,
	magicResponsiveNumber: 0.01,
	paralaxSlow: 0.2,
	paralaxFast: 0.5,
	getInitialPosition: () => getCurrentFontSize() * 27,
	isMaxTravel: () => {
		if(window.innerWidth <= 375 && window.scrollY >= 297) return true
		if(window.innerWidth <= 428 && window.scrollY >= 343) return true
		if(window.innerWidth <= 810 && window.scrollY >= 613) return true
		if(window.innerWidth <= 1920 && window.scrollY >= 1144) return true
		if(window.innerWidth <= 2880 && window.scrollY >= 1900) return true
	},
	move: () => {
		if(landingWater.isMaxTravel()) return
		const position = (
			(landingWater.originalScrenWidth - window.innerWidth) 
			* landingWater.magicResponsiveNumber 
			+ landingWater.getInitialPosition()
		)
		landingWater.landing.style.setProperty(
			"--background-water-position", 
			`${position - window.scrollY * landingWater.paralaxSlow}px`
		)
		landingWater.landing.style.setProperty(
			"--foreground-water-position", 
			`${position - window.scrollY * landingWater.paralaxFast}px`
		)
	}
}
window.addEventListener("resize", landingWater.move)
window.addEventListener("scroll", landingWater.move)
landingWater.move()


function getCurrentFontSize() {
	return parseFloat(
		window.getComputedStyle(document.querySelector("body")).getPropertyValue("font-size")
	)
}