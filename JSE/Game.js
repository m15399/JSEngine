
var g_game;

JSE.Game = JSE.Class();

JSE.Game.Init = function(config){
	
	if (g_game != undefined){
		console.log('WARNING: TRYING TO CREATE MULTIPLE GAMES!!');
	}
	g_game = this;

	//
	// CONFIG
	//

	this.framerate = 60;
	this.createScreen = true;

	if (config){
		JSE.Mixin(this, config);
	}
	
	if (this.createScreen){
		g_screen = Create(JSE.Screen);
	}

	JSE.requestAnimationFrame = function(f){
		window.requestAnimationFrame(f);
	};

	if (this.framerate == 60){
		JSE.requestAnimationFrame(JSE.Game.MainLoopRequestAnimationFrame);
	} else {
		window.setInterval(JSE.Game.MainLoop, 1000/this.framerate)
	}

}

// STATIC
//
JSE.Game.MainLoopRequestAnimationFrame = function(){
	JSE.Game.MainLoop();
	JSE.requestAnimationFrame(JSE.Game.MainLoopRequestAnimationFrame);
}

// STATIC
//
JSE.Game.MainLoop = function(){
	g_game.UpdateGame();
	if (g_screen)
		g_game.DrawGame(g_screen.ctx);
}

JSE.Game.UpdateGame = function(){
	this.Update();
	g_gameObjectManager.Update();
}

JSE.Game.Update = function(){
	// Override this
}

JSE.Game.DrawGame = function(g){
	g_screen.PreDraw(g);

	this.Draw(g);
	g_gameObjectManager.Draw(g);

	g_screen.PostDraw(g);
}

JSE.Game.Draw = function(g){
	// Override this
}
