
JSE.Utils = {};

JSE.Utils.OutputForCopy = function(title, msg){
	window.prompt(title, msg);
}

JSE.Utils.ListSources = function(){
	var msg = '';

	for(var i = 0; i < JSE.g_sources.length; i++){
		var source = JSE.g_sources[i];
		msg += '<script src="' + source + '"></script>\n';
	}

	JSE.Utils.OutputForCopy('Source list:', msg);
}

JSE.Utils.TimeInSec = function(){
	return Date.now() / 1000.0;
}
