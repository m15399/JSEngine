
var g_config;

JSE.Config = JSE.Class();

JSE.Config.Init = function(userConfig){

	this.width = 800;
	this.height = 600;
	this.runTests = true;
	this.quietTests = true;

	this.listSources = false;
	this.noIncludes = false;

	// Mixin JSE_CONFIG
	//
	if(userConfig){
		JSE.Mixin(this, userConfig);		
	} else {
		console.log('Warning: No user config (JSE_CONFIG) detected');
	}
};

JSE.AddTest('Config', function(){
	var userConfig1 = {
		'a': 2
	};

	var config1 = Create(JSE.Config, userConfig1);
	CHECK(config1.a == 2);
	CHECK(config1.height == 600);

	var userConfig2 = {
		'a': 3,
		'height': 900
	};

	var config2 = Create(JSE.Config, userConfig2);
	CHECK(config2.a == 3);
	CHECK(config2.height == 900);

});
