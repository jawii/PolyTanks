var PolyTank = PolyTank || {};

PolyTank.GameEnd = {

	init: function(levelData, playerOne, playerTwo){
		this.levelData = levelData;
		this.playerOne = playerOne;
		this.playerTwo = playerTwo;

		this.winner;
		

	},

	preload: function(){

	},

	create: function(){

		// var background = this.game.add.sprite(0, 0, "background6");
		// //background.anchor.setTo(1);
		// background.scale.y = 0.8;

		this.loadLevel();

		if(this.playerOne.score > this.playerTwo.score){
			this.winner = this.playerOne;
			this.winnerPos = {
				x: 345,
				y: 190
			}
		}
		else{
			this.winner = this.playerTwo;
			this.winnerPos = {
				x: 470,
				y: 190
			}
		}

		//winner text
		var winnerStyle = {
            font: '60px Arial',
            fill: 'green'
        };
        var winnerNameStyle = {
        	font: '20px Arial',
        	fill: 'red'
        };
		var winnerText = this.game.add.text(this.game.width/2, 100, "Game End", winnerStyle);
		winnerText.anchor.setTo(0.5);
		var winnerNameText = this.game.add.text(this.winnerPos.x, this.winnerPos.y, "WINNER", winnerNameStyle);
		winnerNameText.anchor.setTo(0.5);
		//TODO tween winner text
		this.game.add.tween(winnerNameText).to({fontSize: 25}, 2500, null, true);


		var copyRigthTextStyle = {
          font: "14px aldrichregular",
          fill: "black"
        }
        var copyRightText = this.game.add.text(this.game.world.width - 80, this.game.world.height - 20, '\u00A9' + "Jaakko Kenttä", copyRigthTextStyle);          
        copyRightText.anchor.setTo(0.5);


		
		var style = {
	      boundsAlignH:'center',
	      boundsAlignV:"top",
	      fill: "black",
	      font: "bold 18px Arial",
	      maxLines: 0,
	      shadowBlur:0,
	      shadowColor: "rgba(0,0,0,0)",
	      shadowOffsetX: 0,
	      shadowOffsetY: 0,
	      stroke: "black",
	      strokeThickness: 0,
	      tabs: 0
	      //wordWrap:true,
	      //wordWrapWidth:100
	    };

	    //PLAYERONE
		//shoot amount
		var playerOneText = this.game.add.text(345, 210, this.playerOne.playerName, style);
		playerOneText.anchor.setTo(0.5);
		var playerTwoText = this.game.add.text(470, 210, this.playerTwo.playerName, style);
		playerTwoText.anchor.setTo(0.5);
		
		var shootAmountText = this.game.add.text(235, 245, "Shoots", style);
		shootAmountText.anchor.setTo(0.5);
		shootAmountText.setTextBounds(0, 0, 100, 60);
		
		var accuracyText = this.game.add.text(shootAmountText.x, shootAmountText.y + 27, "Tarkkuus (%)", style)
		accuracyText.anchor.setTo(0.5);
		accuracyText.setTextBounds(0, 0, 100, 60)
		
		var rightAnswersText = this.game.add.text(shootAmountText.x, shootAmountText.y + 54, "Oikein", style);
		rightAnswersText.anchor.setTo(0.5);
		rightAnswersText.setTextBounds(0, 0, 100, 60)
		
		var wrongAnswersText = this.game.add.text(shootAmountText.x, shootAmountText.y + 81, "Väärin", style);
		wrongAnswersText.anchor.setTo(0.5);
		wrongAnswersText.setTextBounds(0, 0, 100, 60)
		
		var packsCollectedText = this.game.add.text(shootAmountText.x, shootAmountText.y + 108, "Laatikoita kerätty", style);
		packsCollectedText.anchor.setTo(0.5);
		packsCollectedText.setTextBounds(0, 0, 100, 60)

		var scoreText = this.game.add.text(shootAmountText.x, shootAmountText.y + 135, "Pisteet", style);
		scoreText.anchor.setTo(0.5);
		scoreText.setTextBounds(0, 0, 100, 60);

		this.playerOneShootAmountText = this.game.add.text(shootAmountText.x + 110, shootAmountText.y, this.playerOne.shootAmount, style);
		this.playerOneShootAmountText.anchor.setTo(0.5);
		this.playerOneAccuracy = Math.floor(this.playerOne.hitAmount / this.playerOne.shootAmount * 100);
		this.playerOneAccuracyText = this.game.add.text(accuracyText.x + 110, accuracyText.y, this.playerOneAccuracy, style);
		this.playerOneAccuracyText.anchor.setTo(0.5);
		this.playerOneCorrectKillText  = this.game.add.text(rightAnswersText.x + 110, rightAnswersText.y, this.playerOne.correctKillAmount, style)
		this.playerOneCorrectKillText.anchor.setTo(0.5);
		var wrongAnswers = this.playerOne.killedAmount - this.playerOne.correctKillAmount;
		this.playerOneWrongAnswersText= this.game.add.text(wrongAnswersText.x + 110, wrongAnswersText.y, wrongAnswers, style);
		this.playerOneWrongAnswersText.anchor.setTo(0.5);
		this.playerOnePacksCollectedText = this.game.add.text(packsCollectedText.x + 110, packsCollectedText.y, this.playerOne.packCollected, style)
		this.playerOnePacksCollectedText.anchor.setTo(0.5);

		this.playerOneScoreText = this.game.add.text(scoreText.x + 110, scoreText.y, this.playerOne.score, style);
		this.playerOneScoreText.anchor.setTo(0.5);



		//PLAYERTWO
		this.playerTwoShootAmountText = this.game.add.text(shootAmountText.x + 235, shootAmountText.y, this.playerTwo.shootAmount, style);
		this.playerTwoShootAmountText.anchor.setTo(0.5);
		this.playerTwoAccuracy = Math.floor(this.playerTwo.hitAmount / this.playerTwo.shootAmount * 100);
		this.playerTwoAccuracyText = this.game.add.text(accuracyText.x + 235, accuracyText.y, this.playerTwoAccuracy, style);
		this.playerTwoAccuracyText.anchor.setTo(0.5);
		this.playerTwoCorrectKillText  = this.game.add.text(rightAnswersText.x + 235, rightAnswersText.y, this.playerTwo.correctKillAmount, style)
		this.playerTwoCorrectKillText.anchor.setTo(0.5);
		var wrongAnswers = this.playerTwo.killedAmount - this.playerTwo.correctKillAmount;
		this.playerTwoWrongAnswersText= this.game.add.text(wrongAnswersText.x + 235, wrongAnswersText.y, wrongAnswers, style);
		this.playerTwoWrongAnswersText.anchor.setTo(0.5);
		this.playerTwoPacksCollectedText = this.game.add.text(packsCollectedText.x + 235, packsCollectedText.y, this.playerTwo.packCollected, style)
		this.playerTwoPacksCollectedText.anchor.setTo(0.5);

		this.playerTwoScoreText = this.game.add.text(scoreText.x + 235, scoreText.y, this.playerTwo.score, style);
		this.playerTwoScoreText.anchor.setTo(0.5);

		this.statsDecoder();

		this.startGameTextstyle = {
            font: '30px Arial',
            fill: '#000000'
        };

		var startGameButton = this.game.add.button(400, 500, 'button1');
        startGameButton.anchor.setTo(0.5);
        startGameButton.scale.setTo(1.5);
        var startGameText =this.game.add.text(startGameButton.position.x, startGameButton.position.y, 'Uusi peli', this.startGameTextstyle);
        startGameText.anchor.setTo(0.5);

        //var guideTextText = 'You have 60 seconds \n\n to place as many points you can in the Cartesian coordinate grid.';
        //var guideText = this.game.add.text(this.game.world.width/2.5, this.game.world.height/2, guideTextText, guideTextStyle);
        //guideText.anchor.setTo(0.5);
        //guideText.setTextBounds(100, 0, 100, 100);
        
        startGameButton.events.onInputDown.add(function(){
            PolyTank.game.state.start('MainMenu', true, false);
        }, this);
	},

	statsDecoder: function(){

		// this.playerTwoWrongAnswersText
		// this.playerTwoPacksCollectedText

		// this.playerTwo.packCollected
		// var wrongAnswers = this.playerTwo.killedAmount - this.playerTwo.correctKillAmount


		//check which is accuracy is better
		if(this.playerTwoAccuracy > this.playerOneAccuracy){
      		this.playerTwoAccuracyText.fill = "green";
		}
		else if (this.playerTwoAccuracy < this.playerOneAccuracy){
			this.playerOneAccuracyText.fill = "green";
		}
		else{
			this.playerOneAccuracyText.fill = "green";
			this.playerTwoAccuracyText.fill = "green";
		}


		if(this.playerOne.correctKillAmount > this.playerTwo.correctKillAmount){
			this.playerOneCorrectKillText.fill = "green";
		}
		else if (this.playerOne.correctKillAmount < this.playerTwo.correctKillAmount){
			this.playerTwoCorrectKillText.fill = "green";
		}
		else{
			this.playerTwoCorrectKillText.fill = "green";
			this.playerOneCorrectKillText.fill = "green";
		}

		if(this.playerOne.score > this.playerTwo.score){
			this.playerOneScoreText.fill = "green";
		}
		else if (this.playerOne.score < this.playerTwo.score){
			this.playerTwoScoreText.fill = "green";
		}
		else{
			this.playerOneScoreText.fill = "green";
			this.playerTwoScoreText.fill = "green";
		}





	},

	loadLevel: function(){
		//create tilemap object
	    this.map = this.add.tilemap('level2');

	    //join the tile images to json data
	    this.map.addTilesetImage("UIpackSheet_transparent", 'endTiles');

	    //create tile layers
	    this.backgroundLayer = this.map.createLayer('backgroundLayer');
	    // this.collisionLayer = this.map.createLayer('collisionLayer');
	    this.backgroundLayer.alpha = 0.5;

	    //resize the world to fit the layer
	    // this.collisionLayer.resizeWorld();

	    //create moving background
	    this.backgroundSprite = this.add.tileSprite(0, 0, 1025, 1025, 'background6');
	    //this.background.anchor = 0.7
	    this.backgroundSprite.scale.y = 0.8;
	    //this.backgroundSprite.width = this.game.world.width;
	    //this.backgroundSprite.height = this.game.world.height;
	    this.backgroundSprite.autoScroll(7, 0);

	    //send background to the back
	    this.game.world.sendToBack(this.backgroundSprite);
	}





};