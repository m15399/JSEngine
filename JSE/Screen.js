
var g_screen;

JSE.Screen = JSE.Class();

JSE.Screen.Init0 = function(){
	this.sideColor = '#222';
	this.backgroundColor = 'black';

	var c = document.createElement('canvas');
	document.body.style.margin = 0;	
	document.body.style.backgroundColor = this.backgroundColor;
	document.body.style.overflow = 'hidden';

	this.canvas = c;
	this.Resize();
	window.onresize = function(e){ g_screen.Resize(); };

	document.body.appendChild(c);
	this.ctx = c.getContext('2d');
	window.g = this.ctx;
}

JSE.Screen.Resize = function(w, h){
	this.canvas.width = window.innerWidth;;
	this.canvas.height = window.innerHeight;

	JSE.width = g_config.width;
	JSE.height = g_config.height;

	var desiredAspect = JSE.width / JSE.height;
	var canvasAspect = this.canvas.width / this.canvas.height;

	if(desiredAspect < canvasAspect){
		this.scale = this.canvas.height / JSE.height;		
	} else {
		this.scale = this.canvas.width / JSE.width;				
	}

	this.left = (window.innerWidth / this.scale - JSE.width) / 2;
	this.top = (window.innerHeight / this.scale - JSE.height) / 2
}

JSE.Screen.PreDraw = function(g){
	var g = this.ctx;

	g.fillStyle = this.sideColor;
	g.fillRect(0, 0, this.canvas.width, this.canvas.height);

	g.save();
	g.scale(this.scale, this.scale);
	g.translate(this.left, this.top);

	g.fillStyle = this.backgroundColor;
	g.fillRect(0, 0, JSE.width, JSE.height);

	g.beginPath();
	g.rect(0, 0, JSE.width, JSE.height);
	g.clip();

	g.translate(JSE.width/2, JSE.height/2);
}

JSE.Screen.PostDraw = function(g){
	g.restore();
}
