var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

var click = new Audio('click.mp3');
var crack = new Audio('crack.mp3');


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
	y: 250,		// Center y
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
	ctx.fillStyle = "blue";
	ctx.fill();
}

// [w, h, x, y, visible]
var blocks = [
	// Row 1
	[95, 20, 005, 5, true, "red"],
	[95, 20, 105, 5, true, "red"],
	[95, 20, 205, 5, true, "red"],
	[95, 20, 305, 5, true, "red"],
	[95, 20, 405, 5, true, "red"],
	[95, 20, 505, 5, true, "red"],
	[95, 20, 605, 5, true, "red"],
	[90, 20, 705, 5, true, "red"],

	// Row 2
	[95, 20, 005, 30, true, "red"],
	[95, 20, 105, 30, true, "red"],
	[95, 20, 205, 30, true, "red"],
	[95, 20, 305, 30, true, "red"],
	[95, 20, 405, 30, true, "red"],
	[95, 20, 505, 30, true, "red"],
	[95, 20, 605, 30, true, "red"],
	[90, 20, 705, 30, true, "red"],

	// Row 3
	[95, 20, 005, 55, true, "orange"],
	[95, 20, 105, 55, true, "orange"],
	[95, 20, 205, 55, true, "orange"],
	[95, 20, 305, 55, true, "orange"],
	[95, 20, 405, 55, true, "orange"],
	[95, 20, 505, 55, true, "orange"],
	[95, 20, 605, 55, true, "orange"],
	[90, 20, 705, 55, true, "orange"],

	// Row 4
	[95, 20, 005, 80, true, "orange"],
	[95, 20, 105, 80, true, "orange"],
	[95, 20, 205, 80, true, "orange"],
	[95, 20, 305, 80, true, "orange"],
	[95, 20, 405, 80, true, "orange"],
	[95, 20, 505, 80, true, "orange"],
	[95, 20, 605, 80, true, "orange"],
	[90, 20, 705, 80, true, "orange"],

	// Row 5
	[95, 20, 005, 105, true, "green"],
	[95, 20, 105, 105, true, "green"],
	[95, 20, 205, 105, true, "green"],
	[95, 20, 305, 105, true, "green"],
	[95, 20, 405, 105, true, "green"],
	[95, 20, 505, 105, true, "green"],
	[95, 20, 605, 105, true, "green"],
	[90, 20, 705, 105, true, "green"],

	// Row 6
	[95, 20, 005, 130, true, "green"],
	[95, 20, 105, 130, true, "green"],
	[95, 20, 205, 130, true, "green"],
	[95, 20, 305, 130, true, "green"],
	[95, 20, 405, 130, true, "green"],
	[95, 20, 505, 130, true, "green"],
	[95, 20, 605, 130, true, "green"],
	[90, 20, 705, 130, true, "green"],

	// Row 7
	[95, 20, 005, 155, true, "yellow"],
	[95, 20, 105, 155, true, "yellow"],
	[95, 20, 205, 155, true, "yellow"],
	[95, 20, 305, 155, true, "yellow"],
	[95, 20, 405, 155, true, "yellow"],
	[95, 20, 505, 155, true, "yellow"],
	[95, 20, 605, 155, true, "yellow"],
	[90, 20, 705, 155, true, "yellow"],

	// Row 8
	[95, 20, 005, 180, true, "yellow"],
	[95, 20, 105, 180, true, "yellow"],
	[95, 20, 205, 180, true, "yellow"],
	[95, 20, 305, 180, true, "yellow"],
	[95, 20, 405, 180, true, "yellow"],
	[95, 20, 505, 180, true, "yellow"],
	[95, 20, 605, 180, true, "yellow"],
	[90, 20, 705, 180, true, "yellow"]
];

function drawBlocks(){

	blocks.forEach(x => {
		if (x[4] == true){

			ctx.beginPath();
			ctx.rect(x[2], x[3], x[0], x[1]);
			ctx.stroke();
			ctx.fillStyle = x[5];
			ctx.fill();
		}
	});


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
	// Player
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
	if 
	(
		ball.y + ball.size == player.y && 			// Bottom edge of ball is top edge of player
		ball.x + ball.size > player.x && 			// 
		ball.x + ball.size < player.x + player.w	// 
	)
	{
		ball.dy *= -1;
		var ballPos = (ball.x);
		var playerCenter = player.x + (player.w / 2);

		var ballOffset = (ballPos - playerCenter) / (player.w / 2);
		ball.dx = ballOffset * 5; 	// Change angle
		ball.dx.toFixed(2);
		console.log(ball.dx);
		click.play();
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
			ball.y - ball.size == blocks[x][3] + blocks[x][1] &&	// Top "point" of ball is at block bottom edge
			ball.x - ball.size >= blocks[x][2] && 					// Top "point" of ball is right of left side of block
			ball.x - ball.size <= blocks[x][2] + blocks[x][0] && 	// Top "point" of ball is left of right side of block
			blocks[x][4] == true									// Block was visible
		)
		{
			console.log("bottom");
			ball.dy *= -1;
			blocks[x][4] = false;
			crack.play();
			break;
		}

		// Top edge of block
		if 
		(			
			ball.y + ball.size == blocks[x][3] &&					// Bottom "point" of ball is at block top edge
			ball.x + ball.size >= blocks[x][2] && 					// Bottom "point" of ball is right of left side of block
			ball.x + ball.size <= blocks[x][2] + blocks[x][0] && 	// Bottom "point" of ball is left of right side of block
			blocks[x][4] == true									// Block was visible
		)
		{
			console.log("top");
			ball.dy *= -1;
			blocks[x][4] = false;
			crack.play();
			break;
		}

		/*
		// Left edge of block
		if 
		(
			ball.x + ball.size == blocks[x][2] &&					// Right "point" of ball is at block left edge
			ball.x + ball.size >= blocks[x][3] && 					// Right "point" of ball is below block top edge
			ball.x + ball.size <= blocks[x][3] + blocks[x][1] && 	// Right "point" of ball is above block bottom edge
			blocks[x][4] == true									// Block was visible
		)
		{
			console.log("left");
			console.log(blocks[x]);
			ball.dx *= -1;
			blocks[x][4] = false;
			break;
		}

		// Right edge of block
		if 
		(
			ball.x - ball.size == blocks[x][2] + blocks[x][0] &&	// Left "point" of ball is at block right edge
			ball.x - ball.size >= blocks[x][3] && 					// Left "point" of ball is below block top edge
			ball.x - ball.size <= blocks[x][3] + blocks[x][1] && 	// Left "point" of ball is above block bottom edge
			blocks[x][4] == true									// Block was visible
		)
		{
			console.log("right");
			console.log(blocks[x]);
			ball.dx *= -1;
			blocks[x][4] = false;
			break;
		}
		*/
	}
}

update();

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);