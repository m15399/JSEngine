
var g_game;

JSE.Game = JSE.Class();

JSE.Game.Init0 = function(){
	g_screen = Create(JSE.Screen);
	g_gameObjectManager = Create(JSE.GameObjectManager);

	JSE.requestAnimationFrame = function(f){
		window.requestAnimationFrame(f);
	};

	JSE.requestAnimationFrame(JSE.Game.MainLoop);
}

// STATIC
//
JSE.Game.MainLoop = function(){
	g_game.Update();
	g_game.Draw(g_screen.ctx);
	JSE.requestAnimationFrame(JSE.Game.MainLoop);
}

JSE.Game.Update = function(){
	g_gameObjectManager.Update();
}

JSE.Game.Draw = function(g){
	g_screen.PreDraw(g);

	g_gameObjectManager.Draw(g);

	g_screen.PostDraw(g);
}
