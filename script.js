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

const block1 = {w: 95, h: 20, x: 5, y: 5}
const block2 = {w: 95, h: 20, x: 105, y: 5}
const block3 = {w: 95, h: 20, x: 205, y: 5}
const block4 = {w: 95, h: 20, x: 305, y: 5}
const block5 = {w: 95, h: 20, x: 405, y: 5}
const block6 = {w: 95, h: 20, x: 505, y: 5}
const block7 = {w: 95, h: 20, x: 605, y: 5}
const block8 = {w: 90, h: 20, x: 705, y: 5}

function drawBlocks(){
	ctx.beginPath();
	ctx.rect(block1.x, block1.y, block1.w, block1.h);
	ctx.rect(block2.x, block2.y, block2.w, block2.h);
	ctx.rect(block3.x, block3.y, block3.w, block3.h);
	ctx.rect(block4.x, block4.y, block4.w, block4.h);
	ctx.rect(block5.x, block5.y, block5.w, block5.h);
	ctx.rect(block6.x, block6.y, block6.w, block6.h);
	ctx.rect(block7.x, block7.y, block7.w, block7.h);
	ctx.rect(block8.x, block8.y, block8.w, block8.h);

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