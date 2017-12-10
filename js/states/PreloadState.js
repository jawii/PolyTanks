var PolyTank = PolyTank || {};

PolyTank.PreloadState = {

	init: function(){
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	    this.scale.pageAlignHorizontally = true;
	    this.scale.pageAlignVertically = true;
	},

	preload: function(){

		//levels
		this.load.image('level1', 'assets/images/levels1.png');
		this.load.image('level2', 'assets/images/levels2.png');
		this.load.image('level3', 'assets/images/levels3.png');
		this.load.image('level4', 'assets/images/levels4.png');
		this.load.image('level5', 'assets/images/levels5.png');
		this.load.image('level6', 'assets/images/levels6.png');
		this.load.image('level7', 'assets/images/levels7.png');
		this.load.image('level8', 'assets/images/levels8.png');
		this.load.image('level9', 'assets/images/levels9.png');


		//background
		this.load.image('background1', 'assets/images/background1.png');
		this.load.image('background2', 'assets/images/background2.png');
		this.load.image('background3', 'assets/images/background3.png');
		this.load.image('background4', 'assets/images/background4.png');
		this.load.image('background5', 'assets/images/background5.png');
		this.load.image('background6', 'assets/images/background6.png');

		//load tileset
		this.load.image('gameTiles', 'assets/images/tiles_spritesheet.png');
		this.load.tilemap('level', 'assets/images/tilemap.json', null, Phaser.Tilemap.TILED_JSON);
		
		//load tasks
		this.load.text('taskData', 'js/tasks/tasks.json');
		//panels
		// this.load.image('panel_blue', 'assets/images/panel_blue.png');
		this.load.image('shard_wood', 'assets/images/shard_wood.png');
		this.load.image('shard_stone', 'assets/images/shard_stone.png');
		this.load.image('shard_glass', 'assets/images/shard_glass.png');
		this.load.image('panel_red', 'assets/images/panel_red.png');
		this.load.image('panel_blue', 'assets/images/panel_Blue.png');
		// this.load.image('panel_wood', 'assets/images/panel_wood.png');
		// this.load.image('panel_brown', 'assets/images/panel_brown.png');
		this.load.image('panel_lightblue', 'assets/images/panel_lightblue.png');
		this.load.image('panel_light', 'assets/images/panel_light.png');
		// this.load.image('panel_beige', 'assets/images/panel_beige.png');
		this.load.image('panel_light_particles', 'assets/images/panel_light_particles.png');
		this.load.image('panel_lightblue_particles', 'assets/images/panel_lightblue_particles.png');
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

		//healthbar
		this.load.image('healthbar', 'assets/images/healthbar.png');

		//icons
		this.load.image('angleSpeedIcon', 'assets/images/angleSpeedIcon.png');
		this.load.image('bulletSpeedIcon', 'assets/images/bulletSpeedIcon.png');
		this.load.image('fireRateIcon', 'assets/images/fireRateIcon.png');
		this.load.image('bulletDamageIcon', 'assets/images/bulletDamageIcon.png');

		//load sounds
		this.load.audio('gunshot1', ['assets/audio/gunshot1.mp3', 'assets/audio/gunshot1.ogg']);
		this.load.audio('gunshot2', ['assets/audio/gunshot2.mp3', 'assets/audio/gunshot2.ogg']);
		this.load.audio('gunshot3', ['assets/audio/gunshot3.mp3', 'assets/audio/gunshot3.ogg']);

		this.load.audio('packComing', ['assets/audio/packComing.mp3', 'assets/audio/packComing.ogg']);

		this.load.audio('packPick', ['assets/audio/packPick.mp3', 'assets/audio/PackPick.ogg']);
		this.load.audio('packPick1', ['assets/audio/packPick1.mp3', 'assets/audio/PackPick1.ogg']);

		this.load.audio('wrongCrate', ['assets/audio/wrongCrate.mp3', 'assets/audio/wrongCrate.ogg']);
		this.load.audio('wrongCrate2', ['assets/audio/wrongCrate2.mp3', 'assets/audio/wrongCrate2.ogg']);

		this.load.audio('hit1', ['assets/audio/hit1.mp3', 'assets/audio/hit1.ogg']);

		this.load.audio('success', ['assets/audio/success.mp3', 'assets/audio/success.ogg']);

		this.load.audio('backgroundMusic', ['assets/audio/backgroundMusic.mp3', 'assets/audio/backgroundMusic.ogg'])



		//PROGRESS BAR
		this.progress = this.game.add.text(this.game.world.centerX, this.game.world.width/3, '0%', {fill: 'white'});    
		this.progress.anchor.setTo(0.5);        
		//show progress bar    
		//var progressBar = this.game.add.sprite(this.game.world.centerX, this.game.world.width/2, 'preloadBar');     
		//progressBar.anchor.setTo(0.5);
		//progressBar.scale.setTo(0.5);     
		//this.game.load.setPreloadSprite(progressBar);    
		this.game.load.onFileComplete.add(this.fileComplete, this);
	},

	create: function(){

 
		
		


		PolyTank.game.state.start('GameState');  
	},

	fileComplete: function (progress, cacheKey, success, totalLoaded, totalFiles) {    
		this.progress.text = progress+"%";

	}


};