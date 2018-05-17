
var LibGame = JSE.Class(JSE.Game);

LibGame.Init = function(){
	var config = {};
	config.framerate = 4;
	config.createScreen = false;

	this.Call(JSE.Game.Init, config);
}

LibGame.Update = function(){
	
}
