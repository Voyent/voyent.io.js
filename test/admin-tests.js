describe('bridgeit.services.admin', function(){

	describe('#getServiceDefinitions()', function(done){

		it('should return the BridgeIt service definition JSON', function (done) {

			bridgeit.services.auth.login({
					account: accountId,
					username: adminId,
					password: adminPassword,
					host: host
				}).then(function(authResponse){
					return bridgeit.services.admin.getServiceDefinitions();
				}).then(function(json){
					console.log('service defintions: ' + JSON.stringify(json));
					done();
				}).catch(function(error){
					console.log('getServiceDefinitions failed ' + error);
				});
		});

	});

	describe('#getRealmUsers()', function(done){

		it('should return a list of realm users', function (done) {

			bridgeit.services.auth.login({
					account: accountId,
					username: adminId,
					password: adminPassword,
					host: host
				}).then(function(authResponse){
					return bridgeit.services.admin.getRealmUsers({
						realm: realmId
					});
				}).then(function(json){
					console.log('getRealmUsers: ' + JSON.stringify(json));
					done();
				}).catch(function(error){
					console.log('getRealmUsers failed ' + error);
				});
		});

	});

	describe('#getRealmUser()', function(done){

		it('should return a single user', function (done) {

			bridgeit.services.auth.login({
					account: accountId,
					username: adminId,
					password: adminPassword,
					host: host
				}).then(function(authResponse){
					return bridgeit.services.admin.getRealmUser({
						realm: realmId,
						username: userId
					});
				}).then(function(json){
					console.log('getRealmUser: ' + JSON.stringify(json));
					done();
				}).catch(function(error){
					console.log('getRealmUser failed ' + error);
				});
		});

	});

	describe('#getAccountRealms()', function(done){

		it('should return a list of realms for the account', function (done) {

			bridgeit.services.auth.login({
					account: accountId,
					username: adminId,
					password: adminPassword,
					host: host
				}).then(function(authResponse){
					return bridgeit.services.admin.getAccountRealms();
				}).then(function(json){
					console.log('getAccountRealms: ' + JSON.stringify(json));
					done();
				}).catch(function(error){
					console.log('getAccountRealms failed ' + error);
				});
		});

	});

	describe('#getAccountRealm()', function(done){

		it('should return a single realm for the account', function (done) {

			bridgeit.services.auth.login({
					account: accountId,
					username: adminId,
					password: adminPassword,
					host: host
				}).then(function(authResponse){
					return bridgeit.services.admin.getAccountRealm({
						realm: realmId
					});
				}).then(function(json){
					console.log('getAccountRealm: ' + JSON.stringify(json));
					done();
				}).catch(function(error){
					console.log('getAccountRealm failed ' + error);
				});
		});

	});
});
