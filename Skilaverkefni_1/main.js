"use strict"
const landshlutar = document.querySelectorAll('path')
const landshlutar_menu = document.querySelectorAll('li')


landshlutar.forEach(landshlutur => landshlutur.addEventListener("mouseenter",  hover));
landshlutar.forEach(landshlutur => landshlutur.addEventListener("mouseleave",  hover_leve));


function hover(e) {
	console.log(e);
	e.srcElement.style.strokeWidth = "4px";
	e.srcElement.style.fill = 'rgba(0, 0, 0, 0.5)';
	landshlutar_menu.forEach(i => {
		console.log(i.dataset.place)
		console.log(e.srcElement.dataset.place)

		if (i.dataset.place == e.srcElement.dataset.place){
			i.classList.toggle('hover')
			console.log('dbfd')
		}
	})


}

function hover_leve(e){
	console.log("--------")
	console.log(e)
	e.srcElement.style.fill = "rgba(0, 0, 0, 0)";
	e.srcElement.style.strokeWidth = "1px";
	e.srcElement.classList.toggle('cssblur');
	landshlutar_menu.forEach(i => {
		if (i.dataset.place === e.srcElement.dataset.place){
			i.classList.toggle('hover')
		}
	})

}


