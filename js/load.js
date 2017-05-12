//loads assets and starts the main menu
var loadState = {
	
	preload : function() {
		
		var loadingLabel = game.add.text(80, 150, 'loading...',
		{font: '30px Courier', fill: 'ffffff'});
		
	game.load.image('background', 'assets/back2.png');
    game.load.image('atm', 'assets/atm.png');
	game.load.image('bank','assets/bank.png');
	 game.load.spritesheet('business', 'assets/leftright.png', 30, 65, 7);
	 game.load.spritesheet('businessmoney', 'assets/moneyman.png', 30, 65, 7);
	 game.load.image('ground', 'assets/platform.png');
	game.load.image('bullet', 'assets/bullet.png');
	game.load.image('menu', 'assets/blackbox.png', 300, 180);
	game.load.image('menucover', 'assets/menucover.png');
	game.load.audio('menuMusic', 'assets/audio/determination.mp3');
	game.load.audio('gunMusic', 'assets/audio/shot.wav');
	game.load.audio('moneyMusic', 'assets/audio/money.mp3');
	},
	
	create : function() {
		game.state.start('menu');
	},	
};