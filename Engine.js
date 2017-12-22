
'use strict';

var JSE = {};

JSE.g_sources = [];
// JSE.g_sources.push('Engine.js');

var noIncludes = false;
var includes = [];

if (window.JSE_CONFIG != undefined){
	noIncludes = JSE_CONFIG.noIncludes;
	includes = JSE_CONFIG.includes;
}

JSE.Include = function(path){
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

for(var i = 0; i < includes.length; i++){
	var file = includes[i];
	JSE.Include(file);
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

	g_game = Create(JSE.Game);

	if(JSE_START)
		JSE_START();
};
