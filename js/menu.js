//The Main Menu
var menuState = {
	
	create : function(){
		menuMusic = game.add.audio('menuMusic');
		menuMusic.play();
		var backg = game.add.tileSprite(0, 0, 800, 600, 'menucover');
				
		
		var startLabel = game.add.text(80, game.world.height - 75,
		'press the U key to play unsynchronized',
		{font: '25px Arial', fill: '#ffffff'});
		
		var startLabel = game.add.text(80, game.world.height - 35,
		'press the I key to play synchronized',
		{font: '25px Arial', fill: '#ffffff'});
		
		var Ukey = game.input.keyboard.addKey(Phaser.Keyboard.U);
		var Ikey = game.input.keyboard.addKey(Phaser.Keyboard.I);
		
		Ukey.onDown.addOnce(this.startUnsync, this);
		Ikey.onDown.addOnce(this.startSync, this);
	},
	
	startUnsync : function() {
		game.state.start('play');
	},
	startSync : function() {
		game.state.start('play2');
	},
	};