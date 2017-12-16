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
		}
		else{
			this.winner = this.playerTwo
		}

		//winner text
		var winnerStyle = {
            font: '60px Arial',
            fill: '#000000'
        };
        var winneNameStyle = {
        	font: '40px Arial',
        	fill: 'green'
        }
		var winnerText = this.game.add.text(this.game.width/2, 50, "Game End", winnerStyle);
		winnerText.anchor.setTo(0.5);
		var winnerNameText = this.game.add.text(this.game.width/2, 140, this.winner.playerName + " is the winner", winnerStyle);
		winnerNameText.anchor.setTo(0.5);
		//TODO tween winner text
		this.game.add.tween(winnerNameText).from({fontSize: 50}, 1500, null, true);


		
		var style = {
	      boundsAlignH:'center',
	      boundsAlignV:"top",
	      fill: "black",
	      font: "bold 20px Arial",
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
	    }

	    //PLAYERONE
		//shoot amount
		var playerText = this.game.add.text(200, 220, this.playerOne.playerName + " stats", style);
		playerText.anchor.setTo(0.5);
		var shootAmountTextPlayerOne = this.game.add.text(200, 280, "Shoots", style);
		shootAmountTextPlayerOne.anchor.setTo(0.5);
		shootAmountTextPlayerOne.setTextBounds(0, 0, 100, 60)
		this.playerOneShootAmountText = this.game.add.text(shootAmountTextPlayerOne.x + 100, shootAmountTextPlayerOne.y, this.playerOne.shootAmount, style)
		this.playerOneShootAmountText.anchor.setTo(0.5);

		//accuracy
		this.playerOneAccuracy = Math.floor(this.playerOne.hitAmount / this.playerOne.shootAmount * 100);
		var accuracyPlayerOne = this.game.add.text(shootAmountTextPlayerOne.x, shootAmountTextPlayerOne.y + 30, "Accuracy (%)", style)
		accuracyPlayerOne.anchor.setTo(0.5);
		accuracyPlayerOne.setTextBounds(0, 0, 100, 60)
		this.playerOneAccuracyText = this.game.add.text(accuracyPlayerOne.x + 100, accuracyPlayerOne.y, this.playerOneAccuracy, style)
		this.playerOneAccuracyText.anchor.setTo(0.5);

		//killed correct crates
		var rightAnswersPlayerOne = this.game.add.text(shootAmountTextPlayerOne.x, shootAmountTextPlayerOne.y + 60, "Right Answers", style);
		rightAnswersPlayerOne.anchor.setTo(0.5);
		rightAnswersPlayerOne.setTextBounds(0, 0, 100, 60)
		this.playerOneCorrectKillText  = this.game.add.text(rightAnswersPlayerOne.x + 100, rightAnswersPlayerOne.y, this.playerOne.correctKillAmount, style)
		this.playerOneCorrectKillText.anchor.setTo(0.5);

		//killed wrong crates
		var wrongAnswers = this.playerOne.killedAmount - this.playerOne.correctKillAmount
		var wrongAnswersPlayerOne = this.game.add.text(shootAmountTextPlayerOne.x, shootAmountTextPlayerOne.y + 90, "Wrong Answers", style);
		wrongAnswersPlayerOne.anchor.setTo(0.5);
		wrongAnswersPlayerOne.setTextBounds(0, 0, 100, 60)
		this.playerOneWrongAnswersText= this.game.add.text(wrongAnswersPlayerOne.x + 100, wrongAnswersPlayerOne.y, wrongAnswers, style)
		this.playerOneWrongAnswersText.anchor.setTo(0.5);

		//pack collected
		var packsCollectedPlayerOne = this.game.add.text(shootAmountTextPlayerOne.x, shootAmountTextPlayerOne.y + 120, "Packs collected", style);
		packsCollectedPlayerOne.anchor.setTo(0.5);
		packsCollectedPlayerOne.setTextBounds(0, 0, 100, 60)
		this.playerOnePacksCollectedText = this.game.add.text(packsCollectedPlayerOne.x + 100, packsCollectedPlayerOne.y, this.playerOne.packCollected, style)
		this.playerOnePacksCollectedText.anchor.setTo(0.5);

		//PLAYERTWO
		//shoot amount
		var playerText = this.game.add.text(600, 220, this.playerTwo.playerName + " stats", style);
		playerText.anchor.setTo(0.5);
		var shootAmountTextPlayerTwo = this.game.add.text(600, 280, "Shoots", style);
		shootAmountTextPlayerTwo.anchor.setTo(0.5);
		shootAmountTextPlayerTwo.setTextBounds(0, 0, 100, 60)
		this.playerTwoShootAmountText = this.game.add.text(shootAmountTextPlayerTwo.x + 100, shootAmountTextPlayerTwo.y, this.playerTwo.shootAmount, style)
		this.playerTwoShootAmountText.anchor.setTo(0.5);

		//accuracy
		this.playerTwoAccuracy = Math.floor(this.playerTwo.hitAmount / this.playerTwo.shootAmount * 100);
		var accuracyPlayerTwo = this.game.add.text(shootAmountTextPlayerTwo.x, shootAmountTextPlayerTwo.y + 30, "Accuracy (%)", style)
		accuracyPlayerTwo.anchor.setTo(0.5);
		accuracyPlayerTwo.setTextBounds(0, 0, 100, 60)
		this.playerTwoAccuracyText = this.game.add.text(accuracyPlayerTwo.x + 100, accuracyPlayerTwo.y, this.playerTwoAccuracy, style)
		this.playerTwoAccuracyText.anchor.setTo(0.5);

		//killed correct crates
		var rightAnswersPlayerTwo = this.game.add.text(shootAmountTextPlayerTwo.x, shootAmountTextPlayerTwo.y + 60, "Right Answers", style);
		rightAnswersPlayerTwo.anchor.setTo(0.5);
		rightAnswersPlayerTwo.setTextBounds(0, 0, 100, 60)
		this.playerTwoCorrectKillText  = this.game.add.text(rightAnswersPlayerTwo.x + 100, rightAnswersPlayerTwo.y, this.playerTwo.correctKillAmount, style)
		this.playerTwoCorrectKillText.anchor.setTo(0.5);

		//killed wrong crates
		var wrongAnswers = this.playerTwo.killedAmount - this.playerTwo.correctKillAmount
		var wrongAnswersPlayerTwo = this.game.add.text(shootAmountTextPlayerTwo.x, shootAmountTextPlayerTwo.y + 90, "Wrong Answers", style);
		wrongAnswersPlayerTwo.anchor.setTo(0.5);
		wrongAnswersPlayerTwo.setTextBounds(0, 0, 100, 60)
		this.playerTwoWrongAnswersText= this.game.add.text(wrongAnswersPlayerTwo.x + 100, wrongAnswersPlayerTwo.y, wrongAnswers, style)
		this.playerTwoWrongAnswersText.anchor.setTo(0.5);

		//pack collected
		var packsCollectedPlayerTwo = this.game.add.text(shootAmountTextPlayerTwo.x, shootAmountTextPlayerTwo.y + 120, "Packs collected", style);
		packsCollectedPlayerTwo.anchor.setTo(0.5);
		packsCollectedPlayerTwo.setTextBounds(0, 0, 100, 60)
		this.playerTwoPacksCollectedText = this.game.add.text(packsCollectedPlayerTwo.x + 100, packsCollectedPlayerTwo.y, this.playerTwo.packCollected, style)
		this.playerTwoPacksCollectedText.anchor.setTo(0.5);

		this.statsDecoder();
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
			this.playerTwoCorrectKillText.fill = "green";
		}
		else if (this.playerOne.correctKillAmount < this.playerTwo.correctKillAmount){
			this.playerOneCorrectKillText.fill = "green";
		}
		else{
			this.playerTwoCorrectKillText.fill = "green";
			this.playerOneCorrectKillText.fill = "green";
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
	    // this.collisionLayer.alpha = 0.7;

	    //resize the world to fit the layer
	    // this.collisionLayer.resizeWorld();

	    //create moving background
	    this.backgroundSprite = this.add.tileSprite(0, 0, 1025, 1025, 'background6');
	    //this.background.anchor = 0.7
	    this.backgroundSprite.scale.y = 0.8;
	    //this.backgroundSprite.width = this.game.world.width;
	    //this.backgroundSprite.height = this.game.world.height;
	    this.backgroundSprite.autoScroll(4, 0);

	    //send background to the back
	    this.game.world.sendToBack(this.backgroundSprite);
	}





};