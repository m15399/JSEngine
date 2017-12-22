
var g_testGame;

function JSE_START(){
	g_testGame = Create(TestGame);
}

var TestGame = JSE.Class();

TestGame.Init = function(){
	this.blocks = [];

	for(var i = 0 ; i < 100; i++){
		var xs = 3;
		var ys = 3;
		this.blocks.push(Create(Blocko, 0, 0, JSE.Utils.Random(-xs, xs), JSE.Utils.Random(-ys, ys)));
	}
}

var Blocko = Class(GameObject);

Blocko.Init = function(x, y, xv, yv){
	this.x = x;
	this.y = y;
	this.xv = xv;
	this.yv = yv;
}

Blocko.Update = function(){
	this.x += this.xv;
	this.y += this.yv;

	var fric = .994;
	this.xv *= fric;
	this.yv *= fric;
}

Blocko.Draw = function(g){
	g.fillStyle = 'white';
	g.fillRect(this.x, this.y, 3, 3);
}
