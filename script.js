var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

const player = {
	w: 160,
	h: 20,
	x: 300,
	y: 575,
	speed: 10,
	dx: 0,
	dy: 0
};

const ball = {
	x: 10,		// Center x
	y: 200,		// Center y
	size: 10,	// Radius
	dx: 5,
	dy: 5
}

function drawPlayer(){
	ctx.beginPath();
	ctx.rect(player.x, player.y, player.w, player.h);
	ctx.stroke();
	ctx.fillStyle = "blue";
	ctx.fill();
}

function drawBall(){
	ctx.beginPath();
	ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
	ctx.stroke();
	ctx.fillStyle = "green";
	ctx.fill();
}

// [w, h, x, y, visible]
var blocks = [
	// Row 1
	[95, 20, 005, 5, true],
	[95, 20, 105, 5, true],
	[95, 20, 205, 5, true],
	[95, 20, 305, 5, true],
	[95, 20, 405, 5, true],
	[95, 20, 505, 5, true],
	[95, 20, 605, 5, true],
	[90, 20, 705, 5, true],

	// Row 2
	[95, 20, 005, 30, true],
	[95, 20, 105, 30, true],
	[95, 20, 205, 30, true],
	[95, 20, 305, 30, true],
	[95, 20, 405, 30, true],
	[95, 20, 505, 30, true],
	[95, 20, 605, 30, true],
	[90, 20, 705, 30, true],

	// Row 3
	[95, 20, 005, 55, true],
	[95, 20, 105, 55, true],
	[95, 20, 205, 55, true],
	[95, 20, 305, 55, true],
	[95, 20, 405, 55, true],
	[95, 20, 505, 55, true],
	[95, 20, 605, 55, true],
	[90, 20, 705, 55, true]
	

	//[650, 20, 0, 100, true] //test


];

function drawBlocks(){
	ctx.beginPath();

	blocks.forEach(x => {
		if (x[4] == true){
			ctx.rect(x[2], x[3], x[0], x[1])
		}
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

	ball.x += ball.dx;
	ball.y += ball.dy;
	checkBlockCollision();
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



	// Ball
	// Side walls
	if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0){
		ball.dx *= -1
	}
	// Top wall
	if (ball.y - (ball.size*2) < 0){
		ball.dy *= -1;
	}

	// Bottom wall
	if (ball.y + ball.size > canvas.height){
		// Lose a life
		//ball.dy *= -1;
	}

	// Detect player
	if (ball.y + ball.size >= player.y && ball.x + ball.size > player.x && ball.x + ball.size < player.x + player.w){
		ball.dy *= -1;
	}

}

function update(){
	clear();
	drawBall();
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

function checkBlockCollision(){
	for (x = 0; x < blocks.length; x++){
		// Bottom edge of block
		if 
		(
			//[650, 20, 0, 100, true] //test
			ball.y - ball.size == blocks[x][3] + blocks[x][1] &&	// Top "point" of ball is above block bottom edge
			ball.x - ball.size >= blocks[x][2] && 					// Top "point" of ball is right of left side of block
			ball.x - ball.size <= blocks[x][2] + blocks[x][0] && 	// Top "point" of ball is left of right side of block
			blocks[x][4] == true									// Block was visible
		)
		{
			console.log("test");
			ball.dy *= -1;
			blocks[x][4] = false;
			break;
		}

		
		// Top edge of block

	}
}

update();

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);