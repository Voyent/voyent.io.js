var accountId 		= 'bsrtests';
var realmId 		= 'test';
var adminId 		= 'admin';
var adminPassword 	= 'secretest';
var userId 			= 'user';
var userPassword 	= 'secretest';
var host 			= 'dev.bridgeit.io';
var deleteTimeout 	= 3000; //deletes are taking longer

describe('bridgeit.io.code', function(){

	describe('#start', function(){
		this.timeout(10000);
		it('should start, restart, then stop the code service', function (done) {

			bridgeit.io.auth.login({
				account: accountId,
				username: adminId,
				password: adminPassword,
				host: host
			}).then(function(authResponse){
				return bridgeit.io.code.start({
					realm: realmId
				});
			}).then(function(response){
				console.log('start() response: ' + response);
				return bridgeit.io.code.restart();
			}).then(function(response){
				console.log('restart() response: ' + response);
				return bridgeit.io.code.stop();
			}).then(function(response){
				console.log('stop() response: ' + response);
				done()
			}).catch(function(response){
				console.log('start() failed ' + JSON.stringify(response));
			});

		});
	});


	describe('#executeFlow', function(){
		it('should execute a flow in the code service', function (done) {

			bridgeit.io.auth.login({
				account: accountId,
				username: adminId,
				password: adminPassword,
				host: host
			}).then(function(authResponse){
				return bridgeit.io.code.start({
					realm: realmId
				});
			}).then(function(){
				return bridgeit.io.code.executeFlow({
					flow: 'richresponse',
					data: {accept: false}
				});
			}).then(function(response){
				console.log('executeFlow() response: ' + response);
				done();
			}).catch(function(error){
				console.log('executeFlow() failed ' + error);
			});

		});
	});
});