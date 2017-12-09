var PolyTank = PolyTank || {};
 

PolyTank.GameState = {

  //initiate game settings
  init: function() {

    //use all the area, don't distort scale
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;    
    this.game.scale.pageAlignHorizontally = true;    
    this.game.scale.pageAlignVeritcally = true;    
    this.game.scale.refresh();
    
    //initiate physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    //constants
    this.WIDTH = this.game.world.width;
    this.HEIGHT = this.game.world.height;

    //turrets spescifications
    this.playerOne = {
      playerName: "Player 1",
      score: 0,
      money: 20,
      angleSpeed: 0.5,
      bulletSpeed: 100,
      fireRate: 500,
      bulletAmount: 50,
      turretLeftKey: Phaser.Keyboard.G,
      turretRightKey: Phaser.Keyboard.H,
      fireButton: Phaser.KeyCode.CONTROL,
      bulletType: "bullet1",
      bulletScale: 0.2,
      turretType: 'turret1',
      bulletDamage: 1,
      guiTextPos: {x: 150, y: 530}
    }
    this.playerTwo = {
      playerName: "Player 2",
      score: 0,
      money: 100,
      angleSpeed: 0.5,
      bulletSpeed: 100,
      fireRate: 500,
      bulletAmount: 50,
      turretLeftKey: Phaser.Keyboard.LEFT,
      turretRightKey: Phaser.Keyboard.RIGHT,
      fireButton: Phaser.KeyCode.SPACEBAR,
      bulletType: "bullet1",
      bulletScale: 0.2,
      turretType: 'turret1',
      bulletDamage: 1,
      guiTextPos: {x: 650, y: 530}
    }

    //first is for weaponFlames and second for turret weapon position
    this.turretOffsets = {
      'turret1': [-2, 30],
      'turret2': [-2.25, 30],
      'turret3': [-1.75, 30],
      'turret4': [-1, 0]
    }

    

  },

  //load the game assets before the game starts
  preload: function() {

    
  },
  //executed after everything is loaded
  create: function() {
    
    //create turret pipes
    this.playerOneTurret = this.game.add.sprite(150, this.HEIGHT - 122, this.playerOne.turretType);
    this.playerOneTurret.anchor.setTo(0, 0.5);
    this.playerOneTurret.angle= -90;
    this.playerOneTurret.scale.setTo(0.6);

    this.playerTwoTurret = this.game.add.sprite(this.WIDTH - 150, this.HEIGHT - 122, this.playerTwo.turretType);
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

    //create shooting  NO SHOOTING WHEN PRESSED DOWN
    //this.playerOneFireButton.onDown.add(this.fireWeapon, null, 1,  {'weapon': this.weaponOne});
    //this.playerTwoFireButton.onDown.add(this.fireWeapon, null, 1,  {'weapon': this.weaponTwo});

    
    
    //random yLocations for crates
    this.yLocs = [];

    //crates group
    this.crates = this.add.group();

    //packs group
    this.packs = this.add.group();


    //TASKS
    this.taskData = JSON.parse(this.game.cache.getText('taskData'));

    this.questionText = "";
    this.tasksIDs = [];
    this.currentTaskid = ""
    this.moveNextLevel = false;

    //get the correct level questions
    for (var object in this.taskData){
      this.tasksIDs.push(object);
    };

    //randomize task array
    this.tasksIDs = this.randomizeArray(this.tasksIDs);
    

    //timers 
    this.countDownTime = this.game.time.create(true);

    //load level
    this.loadLevel();
    //create GUI
    this.createGui();

    //let the playerkill be true, clearTask method kills players so there it's false
    this.playerKill = true;


    //hardcore first pack
    var pack = this.createPack();
    this.createPack();
    this.createPack();
    this.createPack();
    this.createPack();
    this.createPack();



  },
  update: function() {
    //this.game.physics.arcade.overlap(this.weaponOne.bullets, this.crates, this.damageCrate, null, this);
    this.game.physics.arcade.overlap(this.weaponOne.bullets, this.packs, this.collectPack, null, { this: this, 'player': this.playerOne});
    this.game.physics.arcade.overlap(this.weaponTwo.bullets, this.packs, this.collectPack, null, { this: this, 'player': this.playerTwo});
    
    this.game.physics.arcade.overlap(this.weaponTwo.bullets, this.crates, this.damageCrate, null, { this: this, 'player': this.playerTwo});
    this.game.physics.arcade.overlap(this.weaponOne.bullets, this.crates, this.damageCrate, null, { this: this, 'player': this.playerOne});


    //this.game.physics.arcade.collide(sprite, sprite2, function, null, { this: this, var1: "Var1", var2: "Var2" }); 
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

    //check if all correct enemy destroyed
    if(this.moveNextLevel){
     
      //clear the board
      this.clearTask();

      this.scheduleNextTask();
      this.moveNextLevel = false;
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
    //console.log(offset);
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

    var nameTextStyle = {
      boundsAlignV:"top",
      fill: "black",
      font: "bold 16px Arial Black",
      maxLines: 0,
      shadowBlur:0,
      shadowColor: "rgba(0,0,0,0)",
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      stroke: "black",
      strokeThickness: 0,
      tabs: 0,
      wordWrap:false,
      wordWrapWidth:100
    }
    var scoreTextStyle = {
      boundsAlignV:"top",
      fill: "black",
      font: "bold 22px Arial Black",
      maxLines: 0,
      shadowBlur:0,
      shadowColor: "rgba(0,0,0,0)",
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      stroke: "black",
      strokeThickness: 0,
      tabs: 0,
      wordWrap:false,
      wordWrapWidth:100
      }
    var style = {
      boundsAlignV:"top",
      fill: "black",
      font: "bold 16px Arial",
      maxLines: 0,
      shadowBlur:0,
      shadowColor: "rgba(0,0,0,0)",
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      stroke: "black",
      strokeThickness: 0,
      tabs: 0,
      wordWrap:true,
      wordWrapWidth:100
    }


    //PLAYERONE
    //name
    this.playerOneNameText = this.game.add.text(this.playerOne.guiTextPos.x, this.playerOne.guiTextPos.y, this.playerOne.playerName, nameTextStyle);
    this.playerOneNameText.anchor.setTo(0.5);

    //score
    //var playerOneScoreSprite = this.game.add.sprite(this.playerOneNameText.x, this.playerOneNameText.y + 30, 'panel_blue');
    //playerOneScoreSprite.anchor.setTo(0.5);
    //playerOneScoreSprite.scale.setTo(0.35);
    this.playerOneScoreText = this.game.add.text(this.playerOneNameText.x, this.playerOneNameText.y + 30, this.playerOne.score, scoreTextStyle);
    this.playerOneScoreText.anchor.setTo(0.5);

    //bulletSpeed
    var playerOneBulletSpeedSprite = this.game.add.sprite(this.playerOneNameText.x - 110, this.playerOneNameText.y + 15, 'bulletSpeedIcon');
    playerOneBulletSpeedSprite.anchor.setTo(0.5);
    playerOneBulletSpeedSprite.scale.setTo(0.5);
    this.playerOneBulletSpeedText = this.game.add.text(this.playerOneNameText.x - 75, this.playerOneNameText.y + 19, this.playerOne.bulletSpeed, style);
    this.playerOneBulletSpeedText.anchor.setTo(0.5);

    //anglespeed AngleSpeed * 5 is the Game AngleSpeed
    var playerOneAngleSpeedSprite = this.game.add.sprite(this.playerOneNameText.x - 110, this.playerOneNameText.y + 35, 'angleSpeedIcon');
    playerOneAngleSpeedSprite.anchor.setTo(0.5);
    playerOneAngleSpeedSprite.scale.setTo(0.5);
    this.playerOneAngleSpeedText = this.game.add.text(this.playerOneNameText.x - 75, this.playerOneNameText.y + 38, this.playerOne.angleSpeed * 10, style);
    this.playerOneAngleSpeedText.anchor.setTo(0.5);

    //bullet damage
    var playerOneBulletDamageSprite = this.game.add.sprite(this.playerOneNameText.x + 60, this.playerOneNameText.y + 15, 'bulletDamageIcon');
    playerOneBulletDamageSprite.anchor.setTo(0.5);
    playerOneBulletDamageSprite.scale.setTo(0.5);
    this.playerOneBulletDamageText = this.game.add.text(this.playerOneNameText.x + 90, this.playerOneNameText.y + 19, this.playerOne.bulletDamage, style);
    this.playerOneBulletDamageText.anchor.setTo(0.5);
    
    //firerate DIVIDE THE FIRERATE BY 1000 and round it
    var playerOneFireRateSprite = this.game.add.sprite(this.playerOneNameText.x + 60, this.playerOneNameText.y + 35, 'fireRateIcon');
    playerOneFireRateSprite.anchor.setTo(0.5);
    playerOneFireRateSprite.scale.setTo(0.5);
    this.playerOnefireRateText = this.game.add.text(this.playerOneNameText.x + 90, this.playerOneNameText.y + 38, this.playerOne.fireRate / 1000, style);
    this.playerOnefireRateText.anchor.setTo(0.5);


    //PLAYERTWO
    //name
    this.playerTwoNameText = this.game.add.text(this.playerTwo.guiTextPos.x, this.playerTwo.guiTextPos.y, this.playerTwo.playerName, nameTextStyle);
    this.playerTwoNameText.anchor.setTo(0.5);
    //score
    //var playerOneScoreSprite = this.game.add.sprite(this.playerOneNameText.x, this.playerOneNameText.y + 30, 'panel_blue');
    //playerOneScoreSprite.anchor.setTo(0.5);
    //playerOneScoreSprite.scale.setTo(0.35);
    this.playerTwoScoreText = this.game.add.text(this.playerTwoNameText.x, this.playerTwoNameText.y + 30, this.playerTwo.score, scoreTextStyle);
    this.playerTwoScoreText.anchor.setTo(0.5);

    //bulletSpeed
    var playerTwoBulletSpeedSprite = this.game.add.sprite(this.playerTwoNameText.x - 110, this.playerTwoNameText.y + 15, 'bulletSpeedIcon');
    playerTwoBulletSpeedSprite.anchor.setTo(0.5);
    playerTwoBulletSpeedSprite.scale.setTo(0.5);
    this.playerTwoBulletSpeedText = this.game.add.text(this.playerTwoNameText.x - 75, this.playerTwoNameText.y + 19, this.playerTwo.bulletSpeed, style);
    this.playerTwoBulletSpeedText.anchor.setTo(0.5);

    //anglespeed
    var playerTwoAngleSpeedSprite = this.game.add.sprite(this.playerTwoNameText.x - 110, this.playerTwoNameText.y + 35, 'angleSpeedIcon');
    playerTwoAngleSpeedSprite.anchor.setTo(0.5);
    playerTwoAngleSpeedSprite.scale.setTo(0.5);
    this.playerTwoAngleSpeedText = this.game.add.text(this.playerTwoNameText.x - 75, this.playerTwoNameText.y + 38, this.playerTwo.angleSpeed * 10, style);
    this.playerTwoAngleSpeedText.anchor.setTo(0.5);

    //bullet damage
    var playerTwoBulletDamageSprite = this.game.add.sprite(this.playerTwoNameText.x + 60, this.playerTwoNameText.y + 15, 'bulletDamageIcon');
    playerTwoBulletDamageSprite.anchor.setTo(0.5);
    playerTwoBulletDamageSprite.scale.setTo(0.6);
    this.playerTwoBulletDamageText = this.game.add.text(this.playerTwoNameText.x + 90, this.playerTwoNameText.y + 19, this.playerTwo.bulletDamage, style);
    this.playerTwoBulletDamageText.anchor.setTo(0.5);
    
    //firerate
    var playerTwoFireRateSprite = this.game.add.sprite(this.playerTwoNameText.x + 60, this.playerTwoNameText.y + 35, 'fireRateIcon');
    playerTwoFireRateSprite.anchor.setTo(0.5);
    playerTwoFireRateSprite.scale.setTo(0.5);
    this.playerTwofireRateText = this.game.add.text(this.playerTwoNameText.x + 90, this.playerTwoNameText.y + 38, this.playerTwo.fireRate / 1000, style);
    this.playerTwofireRateText.anchor.setTo(0.5);

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

    //create yLocs for crates
    this.yLocs = this.resetYlocations();

    //create tilemap object
    this.map = this.add.tilemap('level');

    //join the tile images to json data
    this.map.addTilesetImage("UIpackSheet_transparent", 'gameTiles');

    //create tile layers
    this.backgroundLayer = this.map.createLayer('backgroundLayer');
    this.collisionLayer = this.map.createLayer('collisionLayer');
    this.collisionLayer.alpha = 0.7;

    //collision layer should be collisionlayer
    this.map.setCollisionBetween(1, 160, true, 'collisionLayer');

    //resize the world to fit the layer
    this.collisionLayer.resizeWorld();

    //create moving background
    this.backgroundSprite = this.add.tileSprite(0, 0, 1025, 1025, 'background6');
    //this.background.anchor = 0.7
    this.backgroundSprite.scale.y = 0.8;
    //this.backgroundSprite.width = this.game.world.width;
    //this.backgroundSprite.height = this.game.world.height;
    this.backgroundSprite.autoScroll(3, 0);

    //send background to the back
    this.game.world.sendToBack(this.backgroundSprite);

    this.scheduleNextTask(this);
  },
  //there is too much arguments :)
  damageCrate: function(bullet, sprite, player){
    //console.log(arguments);
    //console.log(sprite);
    //console.log(this.player);
    //PASS THE DAMAGE METHOD FOR SPRITE BECAUSE NOW YOU CAN PASS PLAYER TO KILL METHOD
    if (sprite.alive) {
      sprite.health -= this.player.bulletDamage;
      sprite.healthBar.setPercent((sprite.health / sprite.maxHealth) * 100);

        if(sprite.health <= 0)
        {
          sprite.kill(this, this.player); 
        }
    }
  //sprite.damage(this.player.bulletDamage, this.player);
    bullet.kill();

    //create tween
    style = {
      font: "16px Arial Black",
      fill: "red"
    }
    var randDirectionX = PolyTank.GameState.game.rnd.integerInRange(-20, 20);;
    var randDirectionY = PolyTank.GameState.game.rnd.integerInRange(-20, 20);;
    //console.log(this);
    var damageText = PolyTank.GameState.game.add.text(sprite.x, sprite.y, this.player.bulletDamage, style);
    damageText.anchor.setTo(0.5);
    var tween = PolyTank.GameState.game.add.tween(damageText).to({x: sprite.x + randDirectionX, y: sprite.y + randDirectionY }, 1000, null, true);
    tween.onComplete.add(function(){
      damageText.destroy();
    }, this);
  },

  createCrate: function(givenX, givenY, data){

    //create random place in game area
    var x = this.game.rnd.integerInRange(0, this.game.width);

    var y = this.yLocs.pop();

    //look for dead element
    var newElement = this.crates.getFirstDead();

    if(!newElement || this.crates.children.length < 10){
      newElement = new PolyTank.Crate(this, x, y, data);
      this.crates.add(newElement);
    }
    else{
      newElement.reset(x, y, data);
    }

    return newElement;
  },

  collectPack: function(bullet, pack, player){

    //console.log(arguments);
    //console.log(pack.data);
    //console.log(this.player);

    bullet.kill();
    pack.kill(this, this.player);

  },

  createPack: function(){
  //create random place in game area
    var x = this.game.rnd.integerInRange(0, this.game.width);

    var y = 0;

    //look for dead element
    var newElement = this.crates.getFirstDead();

    if(!newElement || this.packs.children.length < 10){
      newElement = new PolyTank.Pack(this, x, y);
      this.packs.add(newElement);
    }
    else{
      newElement.reset(x, y);
    }

    return newElement;

  },

  createTask: function(timer, game, taskID){

    game.yLocs = game.resetYlocations();

    //create crates
    var crates = game.taskData[taskID].crates;
    //console.log(crates)
    for (var i = 0; i < crates.length ; i ++)
      var crate = game.createCrate(null, null, crates[i]);
    },

  resetYlocations: function(){
    var array = [];
    
    for (var i = 1 ; i < 7 ; i ++){
      array.push(i * 55)
    }

    //randomize order
    return this.randomizeArray(array)
  },
  scheduleNextTask: function(){

    //console.log(this.tasksIDs.length);
    if (this.tasksIDs.length > 0){
      this.currentTaskid = this.tasksIDs.pop();
      var taskID = this.currentTaskid;
      this.countDownTimer();
      this.countDownTime.onComplete.add(this.createTask, null, 0, this, taskID)
    }
    else{
      console.log("No Tasks");
      //TODO GO TO GAME OVER SCREEN
    }
  },
  updateTaskQuestion: function(context, taskID){
    //create question
    var style = {
        font: "36px Arial",
        fontWeight: 'normal',
        fill: '#ff0000',
        wordWrap: false
    };
    var question = this.taskData[taskID].question;
    this.questionText = this.game.add.text(this.game.width/2, 550, question, style);
    this.questionText.alpha = 0.1;
    this.questionText.anchor.setTo(0.5);
    this.game.add.tween(this.questionText).from( { y: -200 }, 2000, Phaser.Easing.Bounce.Out, true);
    this.game.add.tween(this.questionText).to( { alpha: 1 }, 2000, "Linear", true);
  },
  
  clearTask: function(){
    //no score for players
    this.playerKill = false;
    this.crates.killAll();
    this.weaponTwo.bullets.killAll();
    this.playerKill = true;

    this.questionText.text = "";
  },

  countDownTimer: function(){
    //this.game.time.create()
    //autodestroy
    this.countDownTime = this.game.time.create(true);

    var style = { 
      font: "64px Arial Black", 
      fill: "#0037ff", 
      align: "center" 
    };

    var counter = 0;

    var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 100, "", style);
    text.anchor.setTo(0.5, 0.5);
    this.countDownTime.start();
    this.countDownTime.loop(1000, function(){
       counter++;
       //text.setText(counter);
       if (counter == 2){
        text.setText("New Mission");
        //console.log(this.currentTaskid);
        this.updateTaskQuestion(this, this.currentTaskid);
       }
       else if (counter == 3){
        text.setText("4");
       }
       else if (counter == 4) {
        text.setText("3");
       }
       else if (counter == 5) {
        text.setText("2");
       }
       else if (counter == 6) {
        text.setText("1");
       }
       else if (counter == 7){
         this.countDownTime.stop();
         text.destroy(); 
       }
    }, this)

  },

  updateScore: function(player){
    var scoreText;

    if (player == this.playerOne)
    {
      scoreText = this.playerOneScoreText;
    }
    else{
      scoreText = this.playerTwoScoreText;
    }
    //console.log(scoreText.text)
    if (scoreText.text > player.score){
      scoreText.fill = "red";
    }
    else{
      scoreText.fill = "green";
    }

    scoreText.text = player.score;
    
    var tween = this.game.add.tween(scoreText).from({fontSize: 50}, 1500, null, true);
    
    tween.onComplete.add(function(){ 
      scoreText.text.fontSize = "22px";
      scoreText.fill = "black";
    }, this);
  
  },

  updateStats: function(player){

    if (player == this.playerOne){
      this.weaponOne.bulletSpeed = this.playerOne.bulletSpeed;
      this.playerOneBulletSpeedText.text = this.playerOne.bulletSpeed;
      this.weaponOne.fireRate = this.playerOne.fireRate;
    }
    else if(player == this.playerTwo){
      this.weaponTwo.bulletSpeed = this.playerTwo.bulletSpeed;
      this.playerTwoBulletSpeedText.text = this.playerTwo.bulletSpeed;
      this.weaponTwo.fireRate = this.playerTwo.fireRate;
    }

    this.playerOneNameText.text = this.playerOne.playerName;
    this.playerOneBulletDamageText.text = this.playerOne.bulletDamage;
    this.playerOnefireRateText.text = this.playerOne.fireRate / 1000;
    this.playerOneAngleSpeedText.text = Math.floor(this.playerOne.angleSpeed * 10);
    

    this.playerTwoNameText.text = this.playerTwo.playerName;
    this.playerTwoBulletDamageText.text = this.playerTwo.bulletDamage;
    this.playerTwofireRateText.text = this.playerTwo.fireRate / 1000;
    this.playerTwoAngleSpeedText.text = Math.floor(this.playerTwo.angleSpeed * 10);
    


  },
  randomizeArray: function(array){
    //randomize order

    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
    }

    return array

  }
  

};