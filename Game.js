
var g_game;

JSE.Game = JSE.Class();

JSE.Game.Init0 = function(){
	g_screen = Create(JSE.Screen);

	window.requestAnimationFrame(JSE.Game.MainLoop);
}

// STATIC
//
JSE.Game.MainLoop = function(){
	g_game.Update();
	g_game.Draw(g_screen.ctx);
	window.requestAnimationFrame(JSE.Game.MainLoop);
}

JSE.Game.Update = function(){

}

JSE.Game.Draw = function(g){
	g_screen.PreDraw(g);

	g_screen.PostDraw(g);
}
