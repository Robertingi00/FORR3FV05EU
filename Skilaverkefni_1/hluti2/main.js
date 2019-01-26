
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
console.log(windowWidth);
console.log(windowHeight)

const main_div = document.getElementById('main')

const beginX = windowWidth/3;
const poles =  [];
const rings = [];

var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.style.width = windowWidth;
svg.style.height = windowHeight;
const svgNS = svg.namespaceURI;

function random_hex() {
	return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
}

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function Pole(x, y, width, height, color='#000000', stacks=0) {
	var rect = document.createElementNS(svgNS,'rect');
    rect.setAttribute('x',x-(width/2)-(beginX/2));
    rect.setAttribute('y',y);
    rect.setAttribute('width',width);
    rect.setAttribute('height',height);
    rect.setAttribute('fill',color);
    svg.appendChild(rect);
    if(stacks == 1){
    	rect.dataset.stack = 4;
    }else{
    	rect.dataset.stack = 1;
    }

    var rect2 = document.createElementNS(svgNS,'rect');
    rect2.setAttribute('x',x-5 -(beginX/2));
    rect2.setAttribute('y',y-300);
    rect2.setAttribute('width',10);
    rect2.setAttribute('height',300);
    rect2.setAttribute('fill',color);

  	svg.appendChild(rect);
  	svg.appendChild(rect2);

    poles.push(rect);
}

for(i = 1; i <= 3; i++){

	Pole(beginX * i, 500, 200,10,'#000000',i);
}

main_div.appendChild(svg)


function Ring(x, y, width, height, color='#000000') {
	var ring = document.createElementNS(svgNS,'rect');
    ring.setAttribute('x',x-(width/2)-(beginX/2));
    ring.setAttribute('y',y);
    ring.setAttribute('width',width);
    ring.setAttribute('height',height);
    ring.setAttribute('fill',color);
    ring.dataset.before = "0";
    svg.appendChild(ring);
    rings.push(ring);
}


for(i = 1; i <= 3; i++){
	Ring(beginX, 500 - (20*i), 250 - (20*i),20, random_hex());
}


function move(from, to) {
	console.log(to.dataset.stack);
	from.x.baseVal.value = to.x.baseVal.value - (from.width.baseVal.value-200)/2;
	from.y.baseVal.value = 500 -(20 * to.dataset.stack );
	poles[from.dataset.before].dataset.stack --;
	to.dataset.stack ++;
	from.dataset.before = from.id;



}