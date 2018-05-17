
JSE.AddTest = function(name, t){
	JSE.Tests.push({'name': name, 'test': t});
}

JSE.RunTests = function(){
	var quiet = g_config.quietTests;
	var testsFailed = [];

	function log(msg){
		if(!quiet){
			console.log(msg);
		}
	}

	function err(msg){
		console.log(msg);
	}

	log('==================================================');

	var startTime = JSE.Utils.TimeInSec();

	for(var i = 0; i < JSE.Tests.length; i++){
		var testObj = JSE.Tests[i];
		var name = testObj.name;
		var test = testObj.test;

		log('TEST: ' + name);
		var checksBefore = JSE.CheckFails;
		test();
		var checksAfter = JSE.CheckFails;
		var checksFailed = checksAfter - checksBefore;
		if(checksFailed > 0){
			err('    ######## ' + checksFailed + ' FAILURES IN TEST: ' + name +' ########');
			testsFailed.push(name);
		}
	}
	
	var endTime = JSE.Utils.TimeInSec();
	var timeTaken = endTime - startTime;

	if(testsFailed.length > 0){
		err('==================================================');
		err('TESTS FAILED:');
		err(testsFailed);
	} else {
		log('==================================================');
		console.log('ALL TESTS PASSED (' + timeTaken.toFixed(6) + ' sec)');
	}
}

function CHECK(bool, msg){
	if(!bool){
		JSE.CheckFails++;
		if(msg){
			console.log('    CHECK FAILED: ' + msg);
		}
	}
}

JSE.CheckFails = 0;
JSE.Tests = [];
