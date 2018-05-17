
JSE.Class = function(){
	var c = {};

	JSE.Mixin(c, JSE.Base);

	var supers = [];

	for(var i = 0; i < arguments.length; i++){
		var superc = arguments[i];
		supers.push(superc);
		JSE.Mixin(c, superc);
	}

	// Mixins done. DON'T SET ANY PROPS ABOVE THIS LINE ---------------

	c._class = c;
	c._supers = supers;
	c.Init = function(){};
	c.Init0 = function(){};

	return c;
}

var Class = JSE.Class;

JSE.Create = function(clas){
	var o = Object.create(clas);

	// Apply Init0 from first to last base class
	//
	function InitObject(clas){
		for(var i = 0; i < clas._supers.length; i++){
			InitObject(clas._supers[i]);
		}
		
		clas.Init0.apply(o);		
	}

	InitObject(clas);

	// Run o.Init, which can call Call(Super.Init, args) manually
	//
	var args = Array.prototype.slice.call(arguments, 1);
	clas.Init.apply(o, args);
	
	return o;
}

var Create = JSE.Create;

JSE.Base = {};

JSE.Base.Call = function(f){
	var args = Array.prototype.slice.call(arguments, 1);
	f.apply(this, args);
}

JSE.Mixin = function(a, b){
	for(var prop in b){
		if(b.hasOwnProperty(prop)){
				a[prop] = b[prop];
		}
	}
}



JSE.AddTest('Class', function(){
	var CAInit = 0;
	var CBInit = 0;
	var C0Init = 0;

	var C0 = JSE.Class();

	C0.Init0 = function(){
		C0Init++;
	}

	var CA = JSE.Class(C0);

	CA.Init0 = function(){
		CAInit++;
	}

	CA.Init = function(a){
		this.customInit = a;
	}
	
	CA.SuperAct = function(a){
		this.superAct = 'bogus';
	}

	var CB = JSE.Class();

	CB.Init0 = function(){
		CBInit++;
	}

	CB.Act = function(a){
		this.action = 'bogus';
	}

	CB.SuperAct = function(a){
		this.superAct = a;
	}

	var TestClass = JSE.Class(CA, CB);

	TestClass.Init = function(a){
		this.Call(CA.Init, 123);
		this.arg = a;
	}

	TestClass.Act = function(a){
		this.action = a;
	}

	var o = Create(TestClass, 42);
	o.Act(9000);
	o.SuperAct(2);

	CHECK(C0Init == 1, 'c0 init was ' + C0Init);
	CHECK(CAInit == 1, 'ca init was ' + CAInit);
	CHECK(CBInit == 1, 'cb init was ' + CBInit);
	CHECK(o.arg == 42, 'arg');
	CHECK(o.action == 9000, 'action');
	CHECK(o.superAct == 2, 'super action');
	CHECK(o.customInit == 123, 'custom init');
	CHECK(o._class == TestClass, '_class');
});

