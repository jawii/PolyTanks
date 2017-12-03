var PolyTank = PolyTank || {};
 

PolyTank.GameState = {

  //initiate game settings
  init: function() {

    //use all the area, don't distort scale
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    
    //initiate physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    //constants
    this.WIDTH = this.game.world.width;
    this.HEIGHT = this.game.world.height;

    //turrets spesifications
    this.playerOne = {
      angleSpeed: 0.5,
      bulletSpeed: 200,
      fireRate: 300,
      bulletAmount: 20,
      turretLeftKey: Phaser.Keyboard.G,
      turretRightKey: Phaser.Keyboard.H,
      fireButton: Phaser.KeyCode.CONTROL,
      bulletType: "bullet6",
      bulletScale: 0.2,
      turretType: 'turret3'
    }
    this.playerTwo = {
      angleSpeed: 1.0,
      bulletSpeed: 200,
      fireRate: 1500,
      bulletAmount: 50,
      turretLeftKey: Phaser.Keyboard.LEFT,
      turretRightKey: Phaser.Keyboard.RIGHT,
      fireButton: Phaser.KeyCode.SPACEBAR,
      bulletType: "bullet5",
      bulletScale: 0.2,
      turretType: 'turret4'
    }

    //first is for weaponFlames and second for turret weapon position
    this.turretOffsets = {
      'turret1': [-2, 30],
      'turret2': [-2.25, 30],
      'turret3': [-1.75, 30],
      'turret4': [-1, 0]
    }

    //load level
    this.loadLevel();

  },

  //load the game assets before the game starts
  preload: function() {

    
  },
  //executed after everything is loaded
  create: function() {
    
    //create turret pipes
    this.playerOneTurret = this.game.add.sprite(200, this.HEIGHT - 125, this.playerOne.turretType);
    this.playerOneTurret.anchor.setTo(0, 0.5);
    this.playerOneTurret.angle= -90;
    this.playerOneTurret.scale.setTo(0.6);

    this.playerTwoTurret = this.game.add.sprite(this.WIDTH - 200, this.HEIGHT - 125, this.playerTwo.turretType);
    this.playerTwoTurret.angle= -90;
    this.playerTwoTurret.anchor.setTo(0, 0.5);
    this.playerTwoTurret.scale.setTo(0.6);

    this.playersTurrets = this.game.add.group();
    this.playersTurrets.add(this.playerOneTurret);
    this.playersTurrets.add(this.playerTwoTurret);

    //create turretbodys, turrets and add them to group
    this.playerOneBody = this.game.add.sprite(this.playerOneTurret.x, this.playerOneTurret.y + 15 , 'bodyNavy');
    this.playerOneBody.anchor.setTo(0.5);
    this.playerOneBody.scale.setTo(0.4);

    this.playerTwoBody = this.game.add.sprite(this.playerTwoTurret.x, this.playerTwoTurret.y + 15, 'bodyGrey');
    this.playerTwoBody.anchor.setTo(0.5);
    this.playerTwoBody.scale.setTo(0.4);

    this.playersBody = this.game.add.group();
    this.playersBody.add(this.playerOneBody);
    this.playersBody.add(this.playerTwoBody);


    //create GUI
    this.createGui();

    //create keys
    //playerOne
    this.leftKeyOne = this.game.input.keyboard.addKey(this.playerOne.turretLeftKey);
    this.rightKeyOne = this.game.input.keyboard.addKey(this.playerOne.turretRightKey);
    this.playerOneFireButton = this.input.keyboard.addKey(this.playerOne.fireButton);
    //playerTwo
    this.leftKeyTwo = this.game.input.keyboard.addKey(this.playerTwo.turretLeftKey);
    this.rightKeyTwo = this.game.input.keyboard.addKey(this.playerTwo.turretRightKey);
    this.playerTwoFireButton = this.input.keyboard.addKey(this.playerTwo.fireButton);

    //create weapons   
    this.weaponOne = this.createWeapon(this.playerOne, this.playerOneTurret);
    this.weaponTwo = this.createWeapon(this.playerTwo, this.playerTwoTurret);
    this.weaponOne.onFire.add(this.weaponFlames, this.weaponOne, this.playerOneTurret);
    this.weaponTwo.onFire.add(this.weaponFlames, this.weaponTwo, this.playerTwoTurret);

    //fire when firebutton is pressed
    // this.playerTwoFireButton.onDownCallback(function(){
    //   this.weaponTwo.fire();
    // }, this);

    //hardcode barrell
    this.barrel = this.game.add.sprite(200, 200, 'barrelGreen')
    this.barrel.scale.setTo(0.5);
    this.barrel.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this.barrel);
    this.barrel.enableBody = true;

  },
  update: function() {
    //this.testTurret.angle += 2;
    this.game.physics.arcade.overlap(this.weaponOne.bullets, this.barrel, this.damageBarrel, null, this, this.weaponOne);

    //PLAYER ONE CONTROLS
    if (this.leftKeyOne.isDown && this.playerOneTurret.angle > -175){
      this.playerOneTurret.angle -= this.playerOne.angleSpeed;
    }
    else if(this.rightKeyOne.isDown && this.playerOneTurret.angle < 0){
      this.playerOneTurret.angle += this.playerOne.angleSpeed;
    }
    else if(this.playerOneFireButton.isDown){
      this.weaponOne.fire();
      //this.fireWeapon(this.weaponOne, this.playerOneTurret);
    }

    //PLAYER TWO CONTROLS
    if (this.leftKeyTwo.isDown && this.playerTwoTurret.angle > -175){
      this.playerTwoTurret.angle -= this.playerTwo.angleSpeed;
    }
    else if(this.rightKeyTwo.isDown && this.playerTwoTurret.angle < 0){
      this.playerTwoTurret.angle += this.playerTwo.angleSpeed;
    }
    else if(this.playerTwoFireButton.isDown){
      this.weaponTwo.fire();
      //this.fireWeapon(this.weaponTwo, this.playerTwoTurret);
    }  
    
  },


  render: function(){
    //this.game.debug.spriteInfo(this.playerTwoTurret, 300, 32);
    //this.game.debug.spriteCoords(this.playerTwoTurret, 300, 150);
    //this.game.debug.spriteBounds(this.playerTwoTurret);
    
    //this.game.debug.text('Anchor X: ' + this.playerTwoTurret.anchor.x.toFixed(1) + ' Y: ' + this.playerTwoTurret.anchor.y.toFixed(1), 32, 32);

    //var point = new Phaser.Point(this.playerTwoTurret.x, this.playerTwoTurret.y);
    //this.game.debug.geom(point, 'rgb(0,255,0)');    
    //this.game.debug.text('Anchor X: ' + this.playerTwoTurret.anchor.x.toFixed(1) + ' Y: ' + this.playerTwoTurret.anchor.y.toFixed(1), 32, 32);
    //this.weaponOne.debug()
  },
  createWeapon: function(player, sprite){  
    var weapon;
    weapon = this.game.add.weapon(player.bulletAmount, player.bulletType);
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    weapon.bulletSpeed = player.bulletSpeed;
    var offset = this.turretOffsets[sprite.key][1];
    console.log(offset);
    weapon.trackSprite(sprite, sprite.texture.height + offset, 0, true);
    weapon.fireRate = player.fireRate;
    weapon.bullets.setAll('scale.x', player.bulletScale);
    weapon.bullets.setAll('scale.y', player.bulletScale);
    weapon.bullets.enableBody = true;
    weapon.bulletGravity.y = 12;
    weapon.bulletRotateToVelocity = true;

    return weapon;
  },
  createGui: function(){

    //create GUI texture


    //create Buttons

    //increase fireRate

    //increase Damage and texture

  },
  weaponFlames: function(bullet, weapon){

    //var weapon = this.weapon
    //add bullet animation on fire
    //add a sprite for animate fire effect
    var x = this.trackedSprite.position.x;
    var y = this.trackedSprite.position.y;
    var key = this.trackedSprite.key
    var offset = PolyTank.GameState.turretOffsets[this.trackedSprite.key][0];
    var gunEffectSprite = this.game.add.sprite(x, y, 'shotThin');
    gunEffectSprite.anchor.setTo(0.5, offset);
    gunEffectSprite.scale.setTo(1);
    gunEffectSprite.angle = bullet.angle - 90;

    this.game.sound.play('gunshot1');
    //tween sprite and destroy it oncomplete
    tween = this.game.add.tween(gunEffectSprite).to( { alpha: 0 }, 200, "Linear", true);

    tween.onComplete.add(function(){
      gunEffectSprite.destroy();
    },this)

  },
  loadLevel: function(){
    //create tilemap object
    this.map = this.add.tilemap('level');

    //join the tile images to json data
    this.map.addTilesetImage("UIpackSheet_transparent", 'gameTiles');

    //create tile layers
    this.backgroundLayer = this.map.createLayer('backgroundLayer');
    this.collisionLayer = this.map.createLayer('collisionLayer');
    this.collisionLayer.alpha = 0.8;

    //collision layer should be collisionlayer
    this.map.setCollisionBetween(1, 160, true, 'collisionLayer');

    //resize the world to fit the layer
    this.collisionLayer.resizeWorld();

    //create moving background
    this.background = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'blackbackground');
    this.background.autoScroll(0, 15);

    //send background to the back
    this.game.world.sendToBack(this.background);
  },
  damageBarrel: function(sprite, bullet){
    //sprite is the barrel and bullet is the bullet
    sprite.damage(1);
    console.log(sprite.health);
    bullet.destroy();
  }
  

};