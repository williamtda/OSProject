//Initializes game variables and methods
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'gameDiv');

var timeNow;
var bullet;
var player1;
var player2;
var platforms;
var atms;
var cursors;
var Akey;
var Wkey;
var Skey;
var Dkey;
var balance = 0;
var balanceText;
var prevShot = 0;
var Rkey;
var Mkey;
var p1Count = 0;
var p2Count = 0;
var S = 1;
var prevTransaction = 0;

var menuMusic;
var moneyMusic;
var gunMusic;






function endGame() {
	
	game.paused = true;
	var w = game.world.width;
	var h = game.world.height;

	
	var menu = game.add.sprite(w/2, h/2, 'menu');
	menu.anchor.setTo(0.5, 0.5);
	
	var endMessage = "GAME OVER\n";
	if (p1Count > p2Count)
	{
		endMessage = endMessage + "Player 1 Wins!";
	}
	else if (p1Count < p2Count)
	{
		endMessage = endMessage + "Player 2 Wins!";
	}
	else{
		endMessage = endMessage + "Draw";
	}
	
	var endText = game.add.text(game.world.centerX, game.world.centerY, endMessage,{fill: '#fff' });
	endText.anchor.setTo(0.5,0.5);

	// And a label to illustrate which menu item was chosen.
	var choiceLabel = game.add.text(game.world.centerX, game.world.centerY + menu.height/2+30, 'Click here to restart', {fill: '#000000' });
	choiceLabel.anchor.setTo(0.5, 0.5);

	
	// Add a input listener that can help us return from being paused
    game.input.onDown.add(restart, self);
	function restart(event){
		location.reload();
	}
	
}




//semaphore implementation
function wait(S)
{
	while (S <= 0);
	S--;
}

function signal(S)
{
	S++;
}

function p1ShootRight()
{

	bullet = game.add.sprite(player1.position.x+30, player1.position.y + 30, 'bullet');
	game.physics.arcade.enable(bullet);
	bullet.enableBody = true;
	bullet.body.velocity.x = 400;

}

function p2ShootLeft()
{

	bullet = game.add.sprite(player2.position.x - 10, player2.position.y + 30, 'bullet');
	game.physics.arcade.enable(bullet);
	bullet.enableBody = true;
	bullet.body.velocity.x = -400;
	
}

function p1Die(){
	try {
		player1.kill();
		bullet.kill();
		var respawnTime = this.game.time.totalElapsedSeconds() + Phaser.Timer.SECOND*2;
		game.time.events.add(respawnTime, respawnP1, this);
	}
	catch(err){
		
	}
	
}

function p2Die(){
	try {
		player2.kill();
		bullet.kill();
		var respawnTime = this.game.time.totalElapsedSeconds() + Phaser.Timer.SECOND*2;
		game.time.events.add(respawnTime, respawnP2, this);
	}
	catch(err){
		
	}
	
}

function respawnP1(){
	player1 = game.add.sprite(400, 100, 'businessmoney');
	game.physics.arcade.enable(player1);
	player1.body.bounce.y = 0.2;
    player1.body.gravity.y = 400;
    player1.body.collideWorldBounds = true;
	player1.animations.add('left', [4, 5, 6, 7], 7, true);
	player1.animations.add('right', [0, 1, 2, 3], 7, true); 
}
function respawnP2(){
	player2 = game.add.sprite(400, 100, 'businessmoney');
	game.physics.arcade.enable(player2);
	player2.body.bounce.y = 0.2;
    player2.body.gravity.y = 400;
    player2.body.collideWorldBounds = true;
	player2.animations.add('left', [4, 5, 6, 7], 7, true);
	player2.animations.add('right', [0, 1, 2, 3], 7, true); 
	
}




game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('play2', playState2);


game.state.start('boot');