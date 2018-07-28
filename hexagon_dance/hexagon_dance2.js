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

let shapes = [];

class Hectagon = {
	constructor(center, size, orient, color) {
		this.center = center;
		this.size = size;
		this.orient = orient;
		this.color = color;
	}

	draw() {
		ctx.beginPath();
		for (let i = 0; i <= 6; i ++) {
			let x = this.center.x + findX(i, 6, orient) * size;
			let y = this.center.y + findY(i, 6, orient) * size;
			ctx.lineTo(x, y);
		};
		ctx.fillStyle = color;
		ctx.fill();
	}
};

let numOfHexes = Math.pow((H/shapeSize), 2);
