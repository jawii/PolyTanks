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


    //generate framearrays
    this.turretTextures = Phaser.Animation.generateFrameNames('tanks_turret', 1, 4, '.png');
    this.smokeTextures = Phaser.Animation.generateFrameNames('tank_explosion', 11, 12, '.png')
    

    this.playerOne = {
      angleSpeed: 0.5,
      bulletSpeed: 300,
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
      bulletSpeed: 100,
      fireRate: 1500,
      bulletAmount: 50,
      turretLeftKey: Phaser.Keyboard.LEFT,
      turretRightKey: Phaser.Keyboard.RIGHT,
      fireButton: Phaser.KeyCode.SPACEBAR,
      bulletType: "bullet3",
      bulletScale: 0.2,
      turretType: 'turret4'
    }





  },

  //load the game assets before the game starts
  preload: function() {

    
  },
  //executed after everything is loaded
  create: function() {
    //create moving background
    this.background = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'blackbackground');
    this.background.autoScroll(0, 15);


    //create turret pipes
    this.playerOneTurret = this.game.add.sprite(250, this.HEIGHT - 100, this.playerOne.turretType);
    this.playerOneTurret.anchor.setTo(0, 0.5);
    this.playerOneTurret.angle= -90;
    this.playerOneTurret.scale.setTo(0.6);

    this.playerTwoTurret = this.game.add.sprite(this.WIDTH - 250, this.HEIGHT - 100, this.playerTwo.turretType);
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

  },
  update: function() {
    //this.testTurret.angle += 2;

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
    weapon.trackSprite(sprite, 50, 0, true);
    weapon.fireRate = player.fireRate;
    weapon.bullets.setAll('scale.x', player.bulletScale);
    weapon.bullets.setAll('scale.y', player.bulletScale);
    weapon.bullets.enableBody = true;
    weapon.bulletGravity.y = 12;
    weapon.bulletRotateToVelocity = true;

    return weapon;

    //generate bullet animation
    //var frames = Phaser.Animation.generateFrameNames('tank_bulletFly', 1, 1, ".png");
    //this.weaponOne.bullets.enableBody = true;
    //this.weaponOne.bulletGravity.y = 100;
  },
  createGui: function(){

    //create GUI texture

    //create Buttons

    //increase fireRate

    //increase Damage and texture

  },
  weaponFlames: function(sprite){

    //var weapon = this.weapon
    //add bullet animation on fire
    //add a sprite for animate fire effect
    var x = this.trackedSprite.position.x;
    var y = this.trackedSprite.position.y;
    var gunEffectSprite = this.game.add.sprite(x, y, 'shotThin');
    gunEffectSprite.anchor.setTo(0.5, -2);
    gunEffectSprite.scale.setTo(1);
    gunEffectSprite.angle = sprite.angle - 90;

    this.game.sound.play('gunshot1');
    //tween sprite and destroy it oncomplete
    tween = this.game.add.tween(gunEffectSprite).to( { alpha: 0 }, 200, "Linear", true);

    tween.onComplete.add(function(){
      gunEffectSprite.destroy();
    },this)

  }
  

};