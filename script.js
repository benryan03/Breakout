//var horizontalDistance = 740;

const image = document.getElementById('player');

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

const player = {
	w: 40,
	h: 40,
	x: 0,
	y: 560,
	speed: 10,
	dx: 0,
	dy: 0
};

function drawPlayer(){
	ctx.drawImage(image, player.x, player.y, player.w, player.h);
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
	// Top
	//if (player.y < 0){
	//	player.y = 0;
	//}
	// Bottom
	//if (player.y + player.h > canvas.height){
	//	player.y = canvas.height - player.w;
	//}
}

function update(){

	clear();

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






