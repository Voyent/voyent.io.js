describe('bridgeit.io.admin', function(){

	describe('#getServiceDefinitions()', function(done){

		it('should return the BridgeIt service definition JSON', function (done) {

			bridgeit.io.auth.login({
					account: accountId,
					username: adminId,
					password: adminPassword,
					host: host
				}).then(function(authResponse){
					return bridgeit.io.admin.getServiceDefinitions();
				}).then(function(json){
					console.log('service defintions: ' + JSON.stringify(json));
					done();
				}).catch(function(error){
					console.log('getServiceDefinitions failed ' + error);
				});
		});

	});

	describe('#getAccount()', function(done){

		it('should return the account JSON', function (done) {

			bridgeit.io.auth.login({
					account: accountId,
					username: adminId,
					password: adminPassword,
					host: host
				}).then(function(authResponse){
					return bridgeit.io.admin.getAccount();
				}).then(function(json){
					console.log('account: ' + JSON.stringify(json));
					done();
				}).catch(function(error){
					console.log('getAccount failed ' + error);
				});
		});

	});

	describe('#getRealmUsers()', function(done){

		it('should return a list of realm users', function (done) {

			bridgeit.io.auth.login({
					account: accountId,
					username: adminId,
					password: adminPassword,
					host: host
				}).then(function(authResponse){
					return bridgeit.io.admin.getRealmUsers({
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

			bridgeit.io.auth.login({
					account: accountId,
					username: adminId,
					password: adminPassword,
					host: host
				}).then(function(authResponse){
					return bridgeit.io.admin.getRealmUser({
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

			bridgeit.io.auth.login({
					account: accountId,
					username: adminId,
					password: adminPassword,
					host: host
				}).then(function(authResponse){
					return bridgeit.io.admin.getAccountRealms();
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

			bridgeit.io.auth.login({
					account: accountId,
					username: adminId,
					password: adminPassword,
					host: host
				}).then(function(authResponse){
					return bridgeit.io.admin.getAccountRealm({
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

	describe('#createRealmUser()', function(done){
		this.timeout(3000);
		it('should create a new realm user', function (done) {

			var user = {
				username: 'test_' + new Date().getTime(),
				firstname: 'test',
				lastname: 'test',
				email: 'test@email.com',
				password: 'password'
			};

			bridgeit.io.auth.login({
					account: accountId,
					username: adminId,
					password: adminPassword,
					host: host
				}).then(function(authResponse){
					return bridgeit.io.admin.createRealmUser({
						user: user,
						realm: realmId
					});
				}).then(function(json){
					console.log('createRealmUser: ' + JSON.stringify(json));
					done();
				}).catch(function(error){
					console.log('createRealmUser failed ' + error);
				});
		});

	});	

	describe('#updateRealmUser()', function(done){

		it('should create a new realm user', function (done) {

			var user = {
				username: 'test_' + new Date().getTime(),
				firstname: 'test',
				lastname: 'test',
				email: 'test@email.com',
				password: 'password'
			};

			bridgeit.io.auth.login({
					account: accountId,
					username: adminId,
					password: adminPassword,
					host: host
				}).then(function(authResponse){
					return bridgeit.io.admin.createRealmUser({
						user: user,
						realm: realmId
					});
				}).then(function(json){
					user.firstname = 'newtest';
					return bridgeit.io.admin.updateRealmUser({
						user: user
					})
				}).then(function(json){
					console.log('updateRealmUser: ' + JSON.stringify(json));
					done();
				}).catch(function(error){
					console.log('updateRealmUser failed ' + error);
				});
		});

	});	

	describe('#deleteRealmUser()', function(done){

		it('should delete a new realm user', function (done) {

			var user = {
				username: 'test_' + new Date().getTime(),
				firstname: 'test',
				lastname: 'test',
				email: 'test@email.com',
				password: 'password'
			};

			bridgeit.io.auth.login({
					account: accountId,
					username: adminId,
					password: adminPassword,
					host: host
				}).then(function(authResponse){
					return bridgeit.io.admin.createRealmUser({
						user: user,
						realm: realmId
					});
				}).then(function(json){
					user.firstname = 'newtest';
					return bridgeit.io.admin.deleteRealmUser({
						username: user.username
					})
				}).then(function(json){
					console.log('deleteRealmUser: ' + JSON.stringify(json));
					done();
				}).catch(function(error){
					console.log('deleteRealmUser failed ' + error);
				});
		});

	});	
});
