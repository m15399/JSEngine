
'use strict';

var JSE = {};

JSE.g_sources = [];

var jsePath;
(function(){
	var allScripts = document.getElementsByTagName('script');
	var path = allScripts[allScripts.length - 1].src.split('?')[0];
	jsePath = path.split('/').slice(0, -1).join('/')+'/';
})();

var noIncludes = false;
var includes = [];

if (window.JSE_CONFIG != undefined){
	noIncludes = JSE_CONFIG.noIncludes;
	includes = JSE_CONFIG.includes || includes;
}

JSE.Include = function(path, external){
	if (!external){
		path = jsePath + path;
	}

	JSE.g_sources.push(path);
	if(!noIncludes){
		var script = document.createElement('script');
		script.src = path;
		document.body.appendChild(script);
	}
}

JSE.Include('Test.js');
JSE.Include('Class.js');
JSE.Include('Utils.js');
JSE.Include('Config.js');
JSE.Include('Screen.js');
JSE.Include('GameObject.js');
JSE.Include('Game.js');
JSE.Include('LibGame.js');

for(var i = 0; i < includes.length; i++){
	var file = includes[i];
	JSE.Include(file, true);
}

// Startup
//
window.onload = function(){
	g_config = Create(JSE.Config, window.JSE_CONFIG);

	if (g_config.runTests){
		JSE.RunTests();
	}

	if (g_config.listSources){
		JSE.Utils.ListSources();
	}

	g_gameObjectManager = Create(JSE.GameObjectManager);

	// g_game = Create(JSE.Game);

	if (g_config.loadAsLib){
		Create(LibGame);
	}

	if(window.JSE_START){
		JSE_START();
	}
};
