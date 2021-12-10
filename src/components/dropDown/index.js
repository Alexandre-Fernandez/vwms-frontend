const HOVER_ELEMENT_CLASS = "js-hover"
const DROP_DOWN_CLASS = "js-drop-down"
const DROP_DOWN_BUTTON_CLASS = "js-drop-down__button"
const DROP_DOWN_IS_OPEN_CLASS = "js-drop-down--is-open"


const init = () => {
	const dropDowns = [...document.querySelectorAll(`.${DROP_DOWN_CLASS}`)]
	for(const dropDown of dropDowns) {
		let hoverElement = null
		if(dropDown.matches(`.${HOVER_ELEMENT_CLASS} .${DROP_DOWN_CLASS}`)) {
			hoverElement = dropDown
			while(!hoverElement.classList.contains(HOVER_ELEMENT_CLASS)) {
				hoverElement = hoverElement.parentNode
			}
		}
		createDropDown(dropDown, hoverElement)
	}
}


init()


function createDropDown(dropDownElement, hoverElement = null) {
	const [button] = [...dropDownElement.children].filter(
		child => child.classList.contains(DROP_DOWN_BUTTON_CLASS)
	)
	const toggleDropDown = e => {
		if(!dropDownElement.classList.contains(DROP_DOWN_IS_OPEN_CLASS) 
		&& e.type !== "mouseout") {
			return dropDownElement.classList.add(DROP_DOWN_IS_OPEN_CLASS)
		}
		dropDownElement.classList.remove(DROP_DOWN_IS_OPEN_CLASS)
	}
	if(hoverElement) {
		hoverElement.addEventListener("mouseover", toggleDropDown)
		hoverElement.addEventListener("mouseout", toggleDropDown)
	}
	if(button) button.addEventListener("click", toggleDropDown)
}