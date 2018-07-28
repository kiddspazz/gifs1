const H = 800;
const W = 800;
const canvasCenter = {x: W/2, y: H/2};
let canvas = document.getElementById('canvas');
canvas.width = W;
canvas.height = H;
let ctx = canvas.getContext('2d');
//turn it into a cartesian coordinate grid
ctx.translate(0, H);
ctx.scale(1, -1);
const shapeSize = 60;
let step = 0;
let color = 'rgb(0,255,255)';

drawHectagon(canvasCenter, shapeSize, step, color);
ring(step, 1);
secondRing(step);
thirdRing(step);

function tick() {
	step ++;
	if (step%3 === 2) {return}
	ctx.clearRect(0,0,H,W);
	drawHectagon(canvasCenter, shapeSize, Math.ceil(step/3) - 1);
	ring(Math.ceil(step/3 + step%3), 1);
	secondRing(Math.ceil(step/3) - 1);
	thirdRing(Math.ceil(step/3) - 1);
};

function drawHectagon(shapeCenter, radius, step, color) {
	let orient = step * 1/6;
		ctx.beginPath();
		for (let i = 0; i <= 6; i ++) {
			let x = shapeCenter.x + findX(i, 6, orient) * shapeSize;
			let y = shapeCenter.y + findY(i, 6, orient) * shapeSize;
			ctx.lineTo(x, y);
		};
		ctx.fillStyle = color;
		ctx.fill();
};

function ring(step, ring) {
	for (let j = 0; j < ring; j ++) {
		for (let i = 0; i < 6; i ++) {
			drawHectagon(
				{
					x: (canvasCenter.x + findX(i, 6, 0) * shapeSize * 2),
					y: (canvasCenter.y + findY(i, 6, 0) * shapeSize * 2)
				},
				shapeSize, (step)
			);
		};
	};
};

function secondRing(step) {
	for (let i = 0; i < 6; i ++) {
		drawHectagon(
			{
				x: (canvasCenter.x + findX(i, 6, 1/6) * shapeSize * 3.5),
				y: (canvasCenter.y + findY(i, 6, 1/6) * shapeSize * 3.5)
			},
			shapeSize, (step)
		);
	};
};

function thirdRing(step) {
	for (let i = 0; i < 6; i ++) {
		drawHectagon(
			{
				x: (canvasCenter.x + findX(i, 6, 0) * shapeSize * 4),
				y: (canvasCenter.y + findY(i, 6, 0) * shapeSize * 4)
			},
			shapeSize, (step)
		);
	};
};

function findX(i, sides, orient) {
	let mult = (2 * i/sides) - orient;
	let answer = Math.round(100000 * Math.sin(mult * Math.PI))/100000;
	return answer
};

function findY(i, sides, orient) {
	let mult = (2 * i/sides) - orient;
	let answer = Math.round(100000 * Math.cos(mult * Math.PI))/100000;
	return answer;
};

window.setInterval(tick, 400);
