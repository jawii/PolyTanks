var PolyTank = PolyTank || {};

PolyTank.PreloadState = {

	preload: function(){
		//background
		this.load.image('blackbackground', 'assets/images/blackbackground.png');

		//load tileset
		this.load.image('gameTiles', 'assets/images/tiles_spritesheet.png');
		this.load.tilemap('level', 'assets/images/tilemap.json', null, Phaser.Tilemap.TILED_JSON);
		
		//guis
		this.load.image('panel_blue', 'assets/images/panel_blue.png');
		this.load.image('panel_red', 'assets/images/panel_red.png');

		//load turrets
		this.load.image('turret1', 'assets/images/turret1.png');
		this.load.image('turret2', 'assets/images/turret2.png');
		this.load.image('turret3', 'assets/images/turret3.png');
		this.load.image('turret4', 'assets/images/turret4.png');

		//load bodies
		this.load.image('bodyNavy', 'assets/images/bodyNavy.png');
		this.load.image('bodyGrey', 'assets/images/bodyGrey.png');

		//load crates
		this.load.image('crateAmmo', 'assets/images/crateAmmo.png');
		this.load.image('crateWood', 'assets/images/crateWood.png');
		this.load.image('crateRepair', 'assets/images/crateRepair.png');
		this.load.image('crateArmor', 'assets/images/crateArmor.png');

		//load bullets
		this.load.image('bullet1', 'assets/images/bullet1.png');
		this.load.image('bullet2', 'assets/images/bullet2.png');
		this.load.image('bullet3', 'assets/images/bullet3.png');
		this.load.image('bullet4', 'assets/images/bullet4.png');
		this.load.image('bullet5', 'assets/images/bullet5.png');
		this.load.image('bullet6', 'assets/images/bullet6.png');

		//load barrels
		this.load.image('barrelGreen', 'assets/images/barrelGreen.png');
		this.load.image('barrelGrey', 'assets/images/barrelGrey.png');
		this.load.image('barrelRed', 'assets/images/barrelRed.png');

		//load gunshoteffects
		this.load.image('shotLarge', 'assets/images/shotLarge.png');
		this.load.image('shotOrange', 'assets/images/shotOrange.png');
		this.load.image('shotRed', 'assets/images/shotRed.png');
		this.load.image('shotThin', 'assets/images/shotThin.png');

		//load sounds
		this.load.audio('shoot_laser1', ['assets/audio/shoot_laser1.mp3', 'assets/audio/shoot_laser1.ogg']);
		this.load.audio('gunshot1', ['assets/audio/gunshot1.mp3', 'assets/audio/gunshot1.ogg']);
	},

	create: function(){
		PolyTank.game.state.start('GameState');  
	}


};