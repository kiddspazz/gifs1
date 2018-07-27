const H = window.innerHeight;
const W = window.innerWidth;
const c = {x: W/2, y: H/2};
const colors = [
	'rgb(255, 0, 0)',
	'rgb(255, 127, 0)',
	'rgb(255, 255, 0)',
	'rgb(0, 255, 0)',
	'rgb(0, 255, 255)',
	'rgb(0, 0, 255)',
	'rgb(127, 0, 255)'
];
let canvas = document.getElementById('canvas');
canvas.width = W;
canvas.height = H;
let ctx = canvas.getContext('2d');

//turn it into a cartesian coordinate grid
ctx.translate(0, H);
ctx.scale(1, -1);

let u = 80;
let circum = 2 * Math.PI
let cycle = 0;
ctx.lineWidth = 3;

function draw() {
	ctx.clearRect(0, 0, W, H);
	for (let sides = 1; sides < 12; sides ++) {
		ctx.beginPath();
		for (let i = 0; i <= sides; i ++) {
			let x = c.x + findX(i, sides) * sides/3;
			let y = c.y + findY(i, sides) * sides/3;
			ctx.lineTo(x, y);
		};
		ctx.strokeStyle = colors[(sides)%colors.length] //(sides+cycle)%colors.length
		ctx.stroke();

		let dotX = c.x + findX(cycle%sides,sides) * sides/3;
		let dotY = c.y + findY(cycle%sides,sides) * sides/3;
		ctx.beginPath();
		ctx.arc(dotX, dotY, 7, 0, circum);
		ctx.fillStyle = 'rgb(255,255,255)';
		ctx.fill();

	};
	cycle ++;

};

function findX(i, sides) {
	let mult = (2 * i/sides)
	let answer = Math.round(100000 * Math.sin(mult * Math.PI))/100000;
	return answer * u;
};

function findY(i, sides) {
	let mult = (2 * i/sides);
	let answer = Math.round(100000 * Math.cos(mult * Math.PI))/100000;
	return answer * u;
};

function distance(a, b) {
	return (Math.sqrt(Math.pow((b[0] - a[0]), 2) + Math.pow((b[1] + a[1]), 2)));
}

function halfWayPoint(a, b) {
	let c = [];
	c[0] = a[0] + .5 * (b[0] - a[0]);
	c[1] = a[1] + .5 * (b[1] - a[1]);
	return c;
}

draw();
window.setInterval(draw,1200);
