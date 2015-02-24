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

	describe('Admin Realm Functions', function(done){
		describe('#getRealms()', function(done){
			it('should return a list of realms for the account', function (done) {

				bridgeit.io.auth.login({
						account: accountId,
						username: adminId,
						password: adminPassword,
						host: host
					}).then(function(authResponse){
						return bridgeit.io.admin.getRealms();
					}).then(function(json){
						console.log('getRealms: ' + JSON.stringify(json));
						done();
					}).catch(function(error){
						console.log('getRealms failed ' + error);
					});
			});

		});
		describe('#getRealm()', function(done){
			it('should return a single realm for the account', function (done) {
				bridgeit.io.auth.login({
						account: accountId,
						username: adminId,
						password: adminPassword,
						host: host
					}).then(function(authResponse){
						return bridgeit.io.admin.getRealm({
							realmName: realmId
						});
					}).then(function(json){
						console.log('getRealm: ' + JSON.stringify(json));
						done();
					}).catch(function(error){
						console.log('getRealm failed ' + error);
					});
			});

		});

		var newRealmName = 'test_' + new Date().getTime();
		var newRealm = {
			name: newRealmName,
			origins: ['*'],
			services: ["bridgeit.doc","bridgeit.locate","bridgeit.store"]
		};

		describe('#createRealm()', function(done){
			it('should create a new realm for the account', function (done) {
				bridgeit.io.auth.login({
						account: accountId,
						username: adminId,
						password: adminPassword,
						host: host
					}).then(function(authResponse){
						return bridgeit.io.admin.createRealm({
							realmName: newRealmName,
							realm: newRealm
						});
					}).then(function(resp){
						console.log('createRealm: ' + resp);
						done();
					}).catch(function(error){
						console.log('createRealm failed ' + error);
					});
			});
		});

		describe('#updateRealm()', function(done){
			it('should update the realm', function (done) {
				bridgeit.io.auth.login({
						account: accountId,
						username: adminId,
						password: adminPassword,
						host: host
					}).then(function(authResponse){
						newRealm.services.push("bridgeit.metrics");
						return bridgeit.io.admin.updateRealm({
							realmName: newRealmName,
							realm: newRealm
						});
					}).then(function(){
						done();
					}).catch(function(error){
						console.log('updateRealm failed ' + error);
					});
			});
		});

		describe('#deleteRealm()', function(done){
			it('should delete the new realm', function (done) {
				bridgeit.io.auth.login({
						account: accountId,
						username: adminId,
						password: adminPassword,
						host: host
					}).then(function(authResponse){
						newRealm.services.push("bridgeit.metrics");
						return bridgeit.io.admin.deleteRealm({
							realmName: newRealmName
						});
					}).then(function(){
						done();
					}).catch(function(error){
						console.log('deleteRealm failed ' + error);
					});
			});
		});
	});

	describe('Admin Realm User Functions', function(done){
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
							realmName: realmId,
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
							realmName: realmId
						});
					}).then(function(resp){
						console.log('createRealmUser: ' + resp);
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
							realmName: realmId
						});
					}).then(function(resp){
						user.firstname = 'newtest';
						return bridgeit.io.admin.updateRealmUser({
							user: user
						})
					}).then(function(){
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
							realmName: realmId
						});
					}).then(function(resp){
						user.firstname = 'newtest';
						return bridgeit.io.admin.deleteRealmUser({
							username: user.username
						})
					}).then(function(){
						done();
					}).catch(function(error){
						console.log('deleteRealmUser failed ' + error);
					});
			});

		});	
	});

	describe('Admin Realm Role Functions', function(done){
		var newRole = {
			name: 'my_role',
			permissions: [
				'bridgeit.doc.saveDocument',
				'bridgeit.doc.getDocument',
				'bridgeit.doc.deleteDocument',
				'bridgeit.doc.updateDocument'
			]
		}
		describe('#createRealmRole()', function(done){
			it('should create a new role in the realm', function (done) {
				bridgeit.io.auth.login({
						account: accountId,
						username: adminId,
						password: adminPassword,
						host: host
					}).then(function(authResponse){
						return bridgeit.io.admin.createRealmRole({realmName: realmId, role: newRole});
					}).then(function(json){
						console.log('createRealmRole: ' + JSON.stringify(json));
						done();
					}).catch(function(error){
						console.log('createRealmRole failed ' + error);
					});
			});
		})
		describe('#getRealmRoles()', function(done){
			it('should return a list of roles for the realm', function (done) {

				bridgeit.io.auth.login({
						account: accountId,
						username: adminId,
						password: adminPassword,
						host: host
					}).then(function(authResponse){
						return bridgeit.io.admin.getRealmRoles({realmName: realmId});
					}).then(function(json){
						console.log('getRealmRoles: ' + JSON.stringify(json));
						done();
					}).catch(function(error){
						console.log('getRealmRoles failed ' + error);
					});
			});
		});
		describe('#updateRealmRole()', function(done){
			it('should update a realm role', function (done) {

				newRole.permissions.push('bridgeit.metrics.doGet');

				bridgeit.io.auth.login({
						account: accountId,
						username: adminId,
						password: adminPassword,
						host: host
					}).then(function(authResponse){
						return bridgeit.io.admin.updateRealmRole({realmName: realmId, role: newRole});
					}).then(function(json){
						console.log('updateRealmRole: ' + JSON.stringify(json));
						done();
					}).catch(function(error){
						console.log('updateRealmRole failed ' + error);
					});
			});
		});
		describe('#deleteRealmRole()', function(done){
			it('should delete a realm role', function (done) {

				newRole.permissions.push('bridgeit.metrics.doGet');

				bridgeit.io.auth.login({
						account: accountId,
						username: adminId,
						password: adminPassword,
						host: host
					}).then(function(authResponse){
						return bridgeit.io.admin.deleteRealmRole({realmName: realmId, id: newRole.name});
					}).then(function(json){
						done();
					}).catch(function(error){
						console.log('deleteRealmRole failed ' + error);
					});
			});
		});
	})

	

	

	

	

	

	

	
});
