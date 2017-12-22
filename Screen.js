
var g_screen;

JSE.Screen = JSE.Class();

JSE.Screen.Init0 = function(){
	this.backgroundColor = 'black';

	var c = document.createElement('canvas');
	document.body.style.margin = 0;	
	document.body.style.backgroundColor = this.backgroundColor;
	document.body.style.overflow = 'hidden';

	this.canvas = c;
	this.Resize(g_config.width, g_config.height);

	document.body.appendChild(c);
	this.ctx = c.getContext('2d');
	window.g = this.ctx;
}

JSE.Screen.Resize = function(w, h){
	this.canvas.width = window.innerWidth;;
	this.canvas.height = window.innerHeight;

	JSE.width = w;
	JSE.height = h;

	this.scale = this.canvas.height / JSE.height;
	this.left = (window.innerWidth / this.scale - JSE.width) / 2;
}

JSE.Screen.PreDraw = function(g){
	var g = this.ctx;

	g.fillStyle = this.backgroundColor;
	g.fillRect(0, 0, this.canvas.width, this.canvas.height);

	g.save();
	g.scale(this.scale, this.scale);
	g.translate(this.left, 0);

	g.fillStyle = 'blue';
	g.fillRect(0, 0, JSE.width, JSE.height);
}

JSE.Screen.PostDraw = function(g){
	g.restore();
}
