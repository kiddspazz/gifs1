const H = window.innerHeight;
const W = window.innerWidth;
const c = {x: W/2, y: H/2};
const colors = [
	'rgb(255, 0, 0)',
	'rgb(255, 127, 0)',
	'rgb(255, 255, 0)',
	'rgb(127, 255, 0)',
	'rgb(0, 255, 127)',
	'rgb(0, 255, 255)',
	'rgb(0, 127, 255)',
	'rgb(0, 0, 255)',
	'rgb(127, 0, 255)',
	'rgb(255, 0, 127)'
];
let canvas = document.getElementById('canvas');
canvas.width = W;
canvas.height = H;
let ctx = canvas.getContext('2d');

//turn it into a cartesian coordinate grid
ctx.translate(0, H);
ctx.scale(1, -1);

let u = 80;
let cycle = 0;
ctx.lineWidth = 3;

function draw() {
	for (let sides = 0; sides < 12; sides ++) {
		ctx.beginPath();
		for (let i = 0; i <= sides; i ++) {
			ctx.lineTo(c.x + findX(i, sides) * sides/3, c.y + findY(i, sides) * sides/3);
		};
		ctx.strokeStyle = colors[(sides+cycle)%colors.length]
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(
			c.x + findX(0,sides) * sides/3,
			c.y + findY(0,sides) * sides/3,
			5,
			0,
			2 * Math.PI
		);
		ctx.fillStyle = 'rgb(255,255,255)';
		ctx.fill();
	}

	cycle ++;
};

function findX(i, sides) {
	let mult = (2 * i/sides)
	let answer = Math.round(10000 * Math.sin(mult * Math.PI))/10000;
	return answer * u;
}

function findY(i, sides) {
	let mult = (2 * i/sides);
	let answer = Math.round(10000 * Math.cos(mult * Math.PI))/10000;
	return answer * u;
}

draw();
window.setInterval(draw, 1000);
