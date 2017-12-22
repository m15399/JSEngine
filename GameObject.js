
JSE.GameObject = JSE.Class();

JSE.GameObject.Init0 = function(){
	g_gameObjectManager.Add(this);
}

JSE.GameObject.Update = function(){}

JSE.GameObject.Draw = function(g){}

var GameObject = JSE.GameObject;

var g_gameObjectManager;

JSE.GameObjectManager = JSE.Class();

JSE.GameObjectManager.Init0 = function(){
	this.objects = [];
}

JSE.GameObjectManager.Add = function(o){
	this.objects.push(o);
}

JSE.GameObjectManager.Update = function(){
	var l = this.objects.length;
	for(var i = 0; i < l; i++){
		var o = this.objects[i];
		o.Update();
	}
}

JSE.GameObjectManager.Draw = function(g){
	var l = this.objects.length;
	for(var i = 0; i < l; i++){
		var o = this.objects[i];
		o.Draw(g);
	}
}
