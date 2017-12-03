var PolyTank = PolyTank || {};

//initiate the Phaser framework
PolyTank.game = new Phaser.Game(800, 600, Phaser.AUTO);
//PolyTank.game = new Phaser.Game('100%', '100%', Phaser.AUTO);

PolyTank.game.state.add('GameState', PolyTank.GameState);
PolyTank.game.state.add('PreloadState', PolyTank.PreloadState);
PolyTank.game.state.add('BootState', PolyTank.BootState);
PolyTank.game.state.add('HomeState', PolyTank.HomeState);

PolyTank.game.state.start('PreloadState');    