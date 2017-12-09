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
      playerName: "Bob",
      score: 0,
      money: 20,
      angleSpeed: 0.5,
      bulletSpeed: 400,
      fireRate: 500,
      bulletAmount: 20,
      turretLeftKey: Phaser.Keyboard.G,
      turretRightKey: Phaser.Keyboard.H,
      fireButton: Phaser.KeyCode.CONTROL,
      bulletType: "bullet2",
      bulletScale: 0.2,
      turretType: 'turret1',
      bulletDamage: 40,
      guiTextPos: {x: 150, y: 530}
    }
    this.playerTwo = {
      playerName: "Helen",
      score: 0,
      money: 100,
      angleSpeed: 1.0,
      bulletSpeed: 400,
      fireRate: 100,
      bulletAmount: 50,
      turretLeftKey: Phaser.Keyboard.LEFT,
      turretRightKey: Phaser.Keyboard.RIGHT,
      fireButton: Phaser.KeyCode.SPACEBAR,
      bulletType: "bullet5",
      bulletScale: 0.2,
      turretType: 'turret4',
      bulletDamage: 40,
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

    this.taskData = JSON.parse(this.game.cache.getText('taskData'));
    
    //random yLocations for crates
    this.yLocs = []

    //crates group
    this.crates = this.add.group()

    this.questionText = "";
    this.tasksIDs = ["taskaab", "taskaaa", "taskabb", "taskbbb"];
    this.currentTaskid = ""
    //console.log(this.crateAmountInTask);
    this.moveNextLevel = false;
    
    //timers 
    this.countDownTime = this.game.time.create(true);

    //load level
    this.loadLevel();
    //create GUI
    this.createGui();

    //let the playerkill be true, clearTask method kills players so there it's false
    this.playerKill = true;



  },
  update: function() {
    //this.game.physics.arcade.overlap(this.weaponOne.bullets, this.crates, this.damageCrate, null, this);
    this.game.physics.arcade.overlap(this.weaponOne.bullets, this.crates, this.damageCrate, null, { this: this, 'player': this.playerOne});
    this.game.physics.arcade.overlap(this.weaponTwo.bullets, this.crates, this.damageCrate, null, { this: this, 'player': this.playerTwo});


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
      font: "bold 14px Arial",
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
      font: "bold 14px Arial",
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

    //name
    this.playerOneNameText = this.game.add.text(this.playerOne.guiTextPos.x, this.playerOne.guiTextPos.y, this.playerOne.playerName, scoreTextStyle);
    this.playerOneNameText.anchor.setTo(0.5);

    //score
    this.playerOneScoreText = this.game.add.text(this.playerOneNameText.x - 80, this.playerOneNameText.y + 20, "Score: " + this.playerOne.score, scoreTextStyle);
    this.playerOneScoreText.anchor.setTo(0.5);

    //money
    this.playerOneMoneyText = this.game.add.text(this.playerOneNameText.x - 80, this.playerOneNameText.y + 40, "Money: " + this.playerOne.money, scoreTextStyle);
    this.playerOneMoneyText.anchor.setTo(0.5);

    //bullet damage
    this.playerOneBulletDamageText = this.game.add.text(this.playerOneNameText.x + 80, this.playerOneNameText.y + 20, "DMG: " + this.playerOne.bulletDamage, scoreTextStyle);
    this.playerOneBulletDamageText.anchor.setTo(0.5);
    
    //firerate
    this.playerOnefireRateText = this.game.add.text(this.playerOneNameText.x + 80, this.playerOneNameText.y + 40, "Firerate: " + this.playerOne.fireRate, scoreTextStyle);
    this.playerOnefireRateText.anchor.setTo(0.5);


    //name
    this.playerTwoNameText = this.game.add.text(this.playerTwo.guiTextPos.x, this.playerTwo.guiTextPos.y, this.playerTwo.playerName, scoreTextStyle);
    this.playerTwoNameText.anchor.setTo(0.5);

    //score
    this.playerTwoScoreText = this.game.add.text(this.playerTwoNameText.x - 80, this.playerTwoNameText.y + 20, "Score: " + this.playerTwo.score, scoreTextStyle);
    this.playerTwoScoreText.anchor.setTo(0.5);

    //money
    this.playerTwoMoneyText = this.game.add.text(this.playerTwoNameText.x - 80, this.playerTwoNameText.y + 40, "Money: " + this.playerTwo.money, scoreTextStyle);
    this.playerTwoMoneyText.anchor.setTo(0.5);

    //bullet damage
    this.playerTwoBulletDamageText = this.game.add.text(this.playerTwoNameText.x + 80, this.playerTwoNameText.y + 20, "DMG: " + this.playerTwo.bulletDamage, scoreTextStyle);
    this.playerTwoBulletDamageText.anchor.setTo(0.5);
    
    //firerate
    this.playerTwofireRateText = this.game.add.text(this.playerTwoNameText.x +80, this.playerTwoNameText.y + 40, "Firerate: " + this.playerTwo.fireRate, scoreTextStyle);
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

    return array;
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
  updateTaskQuestion: function(taskID){
    //create question
    var style = {
        font: "34px Arial",
        fontWeight: 'normal',
        fill: '#ff0000',
        wordWrap: false
    }
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
      font: "64px Arial", 
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
        this.updateTaskQuestion(this.currentTaskid);
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

    var tween = this.game.add.tween(scoreText).from({fontSize: 20}, 1000, null, true);
    
    tween.onComplete.add(function(){
      scoreText.text = "Score: " + player.score;
    }, this);
  
  },

  updateStats: function(){
    this.playerOneNameText.text = this.playerOne.playerName;
    this.playerOneScoreText.text = "Score: " + this.playerOne.score;
    this.playerOneBulletDamageText.text = "DMG: " + this.playerOne.bulletDamage;
    this.playerOnefireRateText.text = "Firerate: " + this.playerOne.fireRate;

    this.playerTwoNameText.text = this.playerTwo.playerName;
    this.playerTwoScoreText.text = "Score: " + this.playerTwo.score;
    this.playerTwoBulletDamageText.text = "DMG: " + this.playerTwo.bulletDamage;
    this.playerTwofireRateText.text = "Firerate: " + this.playerTwo.fireRate;
  }
  

};