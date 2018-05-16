
JSE.GameObject = JSE.Class();

JSE.GameObject.Init0 = function(){
	g_gameObjectManager.Add(this);
}

JSE.GameObject.Destroy = function(){
	g_gameObjectManager.Destroy(this);
}

JSE.GameObject.Update = function(){}

JSE.GameObject.Draw = function(g){}

var GameObject = JSE.GameObject;

var g_gameObjectManager;

JSE.GameObjectManager = JSE.Class();

JSE.GameObjectManager.Init0 = function(){
	this.objects = [];
	this.toAdd = [];
	this.toRemove = [];
}

JSE.GameObjectManager.Add = function(o){
	this.toAdd.push(o);
}

JSE.GameObjectManager.Destroy = function(o){
	this.toRemove.push(o);
}

JSE.GameObjectManager.ProcessLists = function(){
	for(var i = 0; i < this.toAdd.length; i++){
		var o = this.toAdd[i];
		this.objects.push(o);
	}

	this.toAdd = [];
	
	for(var i = 0; i < this.toRemove.length; i++){
		var objectToRemove = this.toRemove[i];

		// TODO speed
		//
		for(var j = 0; j < this.objects.length; j++){
			var o = this.objects[j];
			if (o == objectToRemove){
				this.objects.splice(j, 1);
				break;
			}
		}
	}

	this.toRemove = [];
}

JSE.GameObjectManager.Update = function(){
	this.ProcessLists();

	var l = this.objects.length;
	for(var i = 0; i < l; i++){
		var o = this.objects[i];
		o.Update();
	}
}

JSE.GameObjectManager.Draw = function(g){
	this.ProcessLists();

	var l = this.objects.length;
	for(var i = 0; i < l; i++){
		var o = this.objects[i];
		o.Draw(g);
	}
}
