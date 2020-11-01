var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

const player = {
	w: 160,
	h: 20,
	x: 0,
	y: 580,
	speed: 10,
	dx: 0,
	dy: 0
};

function drawPlayer(){
	ctx.beginPath();
	ctx.rect(player.x, player.y, player.w, player.h);
	ctx.stroke();
	ctx.fillStyle = "blue";
	ctx.fill();
}

// [w, h, x, y]
var blocks = [
	[95, 20, 5, 5],
	[95, 20, 105, 5],
	[95, 20, 205, 5],
	[95, 20, 305, 5],
	[95, 20, 405, 5],
	[95, 20, 505, 5],
	[95, 20, 605, 5],
	[90, 20, 705, 5]
];

function drawBlocks(){
	ctx.beginPath();

	blocks.forEach(x => {
		ctx.rect(x[2], x[3], x[0], x[1])
	});

	ctx.stroke();
	ctx.fillStyle = "red";
	ctx.fill();
}

function clear(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function newPos(){
	player.x += player.dx;
	player.y += player.dy;

	detectWalls();
}

function detectWalls(){
	// Left
	if (player.x < 0){
		player.x = 0;
	}
	// Right
	if (player.x + player.w > canvas.width){
		player.x = canvas.width - player.w;
	}
}

function update(){
	clear();
	drawBlocks();
	drawPlayer();
	newPos();
	requestAnimationFrame(update);
}

function moveRight(){
	player.dx = player.speed;
}

function moveLeft(){
	player.dx = -player.speed;
}

function keyDown(e){
	console.log(e.key);
	if (e.key == 'ArrowRight' || e.key == 'Right'){
		moveRight();
	}
	else if (e.key == 'ArrowLeft' || e.key == 'Left'){
		moveLeft();
	}
}

function keyUp(e){
	if (
		e.key == 'Right' ||
		e.key == 'ArrowRight' ||
		e.key == 'Left' ||
		e.key == 'ArrowLeft'
	){
		player.dx = 0;
		player.dy = 0;
	}
}

update();

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);