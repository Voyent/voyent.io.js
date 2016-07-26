describe('voyent.io.admin', function(){

	var assert = chai.assert;

	this.timeout(10000);

	var adminAuthToken;
	var userAuthToken;
	var adminAuthBlock;
	var userAuthBlock;

	before(function (done) {
		console.log('********* setting up tests ****************');
        voyent.io.auth.login({
			account: accountId,
			username: adminId,
			password: adminPassword,
			host: host
		}).then(function(authResponse){
			adminAuthToken = authResponse.access_token;

			adminAuthBlock = {
				account: accountId,
				username: adminId,
				host: host,
				accessToken: adminAuthToken
			};

			return voyent.io.auth.login({
				account: accountId,
				username: userId,
				password: userPassword,
				realm: realmId,
				host: host
			});
		}).then(function(authResponse){
			userAuthToken = authResponse.access_token;
			userAuthBlock = {
				account: accountId,
				realm: realmId,
				username: userId,
				host: host,
				accessToken: userAuthToken
			};
			done();
		});
    });

	describe('#getServiceDefinitions()', function(done){

		it('should return the Voyent service definition JSON', function (done) {

			voyent.io.admin.getServiceDefinitions(adminAuthBlock).then(function(json){
				console.log('service defintions: ' + JSON.stringify(json));
				done();
			}).catch(function(error){
				assert(false, 'getServiceDefinitions failed ' + error);
			});
		});

	});

	describe('#getAccount()', function(done){

		it('should return the account JSON', function (done) {

			voyent.io.admin.getAccount(adminAuthBlock).then(function(json){
				console.log('account: ' + JSON.stringify(json));
				done();
			}).catch(function(error){
				assert(false, 'getAccount failed ' + error);
			});
		});

	});

	describe('#createAccount()', function(done){

		it('should create an account', function (done) {

			var ts =  new Date().getTime();
			var account = {
				account: 'test_account_' + ts,
				description: 'a test account',
				username: 'test_admin_ts',
				password: 'secretest',
				firstname: 'Test',
				lastname: 'Admin',
				email: 'test@email.com'
			};

			voyent.io.admin.createAccount(account).then(function(token){
				console.log('token: ' + JSON.stringify(token));
				if( !token ){
					assert(false, 'createAccount() failed, no token returned');
				}
				if( !voyent.io.auth.isLoggedIn()){
					assert(false, 'createAccount() failed, did not automatically log in');
				}
				else{
					done();
				}
			}).catch(function(error){
				assert(false, 'createAccount failed ' + error);
			});
		});

	});

	describe('#getLogs()', function(done){
		it('should return a list of service logs for the account', function (done) {

			voyent.io.admin.getLogs(adminAuthBlock).then(function(json){
				console.log('logs: ' + JSON.stringify(json));
				done();
			}).catch(function(error){
				console.log('getLogs failed ', error);
				assert(false, 'getAccount failed ' + error);
			});
		});

	});

	describe('Admin Realm Functions', function(done){
		describe('#getRealms()', function(done){
			it('should return a list of realms for the account', function (done) {

				voyent.io.admin.getRealms(adminAuthBlock).then(function(json){
					console.log('getRealms: ' + JSON.stringify(json));
					done();
				}).catch(function(error){
					console.log('getRealms failed ' + error);
					assert(false, 'getAccount failed ' + error);
				});
			});

		});
		describe('#getRealm()', function(done){
			it('should return a single realm for the account', function (done) {
				var params = _.clone(adminAuthBlock);
				params.realm = realmId;
				voyent.io.admin.getRealm(params).then(function(json){
					console.log('getRealm: ' + JSON.stringify(json));
					done();
				}).catch(function(error){
					console.log('getRealm failed ' + error);
					assert(false, 'getAccount failed ' + error);
				});
			});

		});

		var newRealmName = 'test_' + new Date().getTime();
		var newRealm = {
			name: newRealmName,
			origins: ['*'],
			services: ["voyent.doc","voyent.locate","voyent.store"]
		};

		describe('#createRealm()', function(done){
			it('should create a new realm for the account', function (done) {
				var params = _.clone(adminAuthBlock);
				params.realmName = newRealmName;
				params.realm = newRealm;
				voyent.io.admin.createRealm(params).then(function(resp){
					console.log('createRealm: ' + resp);
					done();
				}).catch(function(error){
					assert(false, 'createRealm failed ' + error);
				});
			});
		});

		describe('#updateRealm()', function(done){
			this.timeout(20000);
			it('should update the realm', function (done) {
				var params = _.clone(adminAuthBlock);
				params.realmName = newRealmName;
				params.realm = newRealm;
				newRealm.custom = "{'test':true}";
				newRealm.services.push("voyent.event");
				voyent.io.admin.updateRealm(params).then(function(){
					var params2 = _.clone(adminAuthBlock);
					params2.realmName = newRealmName;
					return voyent.io.admin.getRealm(params2);
				}).then(function(realm){
					if( realm ){
						if( realm.services.indexOf('voyent.event') > -1 ){
							//http://jira.icesoft.org/browse/NTFY-313
							if( realm.custom === "{'test':true}" ){
								done();
							}
							else{
								console.error('realm custom property not updated');
							}
						}
						else{
							console.error('realm service not added');
						}
					}
					else{
						console.error('realm not found after update');
					}
				}).catch(function(error){
					assert(false, 'updateRealm failed ' + error);
					done(error);
				});
			});

			it('should fail to update an invalid realm and return a 404', function (done) {
				var params = _.clone(adminAuthBlock);
				params.realmName = 'invalid_realm';
				params.realm = newRealm;
				voyent.io.admin.updateRealm(params).catch(function(error){
					if( error.status === 404 ){
						console.log('updating invalid realm returned correct 404');
						done();
					}
					else{
						assert(false, 'error: updating invalid realm returned ' + error);
						done(error);
					}
				});
			});
		});

		describe('#deleteRealm()', function(done){
			it('should delete the new realm', function (done) {
				var params = _.clone(adminAuthBlock);
				params.realmName = newRealmName;
				voyent.io.admin.deleteRealm(params).then(function(){
					done();
				}).catch(function(error){
					assert(false, 'deleteRealm failed ' + error);
				});
			});

			it('should fail to delete an invalid realm and return a 404', function (done) {
				//http://jira.icesoft.org/browse/NTFY-294
				newRealm.services.push("voyent.event");
				var params = _.clone(adminAuthBlock);
				params.realmName = 'invalid_realm';
				voyent.io.admin.deleteRealm(params).catch(function(error){
					if( error.status === 404 ){
						console.log('deleting invalid realm returned correct 404');
						done();
					}
					else{
						chai.assert(false, 'error: deleting invalid realm returned  ' + error);
						done(error);
					}
				});
			});

		});
	});

	describe('Admin Realm User Functions', function(done){
		describe('#getRealmUsers()', function(done){
			it('should return a list of realm users', function (done) {
				var params = _.clone(adminAuthBlock);
				params.realmName = realmId;
				voyent.io.admin.getRealmUsers(params).then(function(json){
					console.log('getRealmUsers: ' + JSON.stringify(json));
					done();
				}).catch(function(error){
					assert(false, 'getRealmUsers failed ' + error);
				});
			});

		});
		describe('#getRealmUser()', function(done){
			it('should return a single user', function (done) {
				var params = _.clone(adminAuthBlock);
				params.realmName = realmId;
				params.username = userId;
				voyent.io.admin.getRealmUser(params).then(function(json){
					console.log('getRealmUser: ' + JSON.stringify(json));
					done();
				}).catch(function(error){
					assert(false, 'getRealmUser failed ' + error);
				});
			});

		});
		describe('#createRealmUser()', function(done){
			this.timeout(3000);
			it('should create a new realm user', function (done) {
				console.log('adminAuthBlock: ' + JSON.stringify(adminAuthBlock));
				var user = {
					username: 'test_' + new Date().getTime(),
					firstname: 'test',
					lastname: 'test',
					email: 'test@email.com',
					password: 'password'
				};
				var params = _.clone(adminAuthBlock);
				params.user = user;
				params.realmName = realmId;
				console.log('params: ' + JSON.stringify(params));
				voyent.io.admin.createRealmUser(params).then(function(resp){
					console.log('createRealmUser: ' + resp);
					done();
				}).catch(function(error){
					assert(false, 'createRealmUser failed ' + error);
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
				var params = _.clone(adminAuthBlock);
				params.user = user;
				params.realmName = realmId;

				voyent.io.admin.createRealmUser(params).then(function(resp){
					user.firstname = 'newtest';
					var params2 = _.clone(adminAuthBlock);
					params2.user = user;
					return voyent.io.admin.updateRealmUser(params2);
				}).then(function(){
					done();
				}).catch(function(error){
					assert(false, 'updateRealmUser failed ' + error);
				});
			});

		});	
		describe('#deleteRealmUser()', function(done){
			this.timeout(deleteTimeout);
			it('should delete a new realm user', function (done) {

				var user = {
					username: 'test_' + new Date().getTime(),
					firstname: 'test',
					lastname: 'test',
					email: 'test@email.com',
					password: 'password'
				};
				var params = _.clone(adminAuthBlock);
				params.user = user;
				params.realmName = realmId;

				voyent.io.admin.createRealmUser(params).then(function(resp){
					var params2 = _.clone(adminAuthBlock);
					params.username = user.username;
					return voyent.io.admin.deleteRealmUser(params2)
				}).then(function(){
					done();
				}).catch(function(error){
					assert(false, 'deleteRealmUser failed ' + error);
				});
			});

		});	
	});

	describe('Admin Realm Role Functions', function(done){
		var newRole = {
			name: 'my_role',
			permissions: [
				'services.doc.saveDocument',
				'services.doc.getDocument',
				'services.doc.deleteDocument',
				'services.doc.updateDocument'
			]
		}
		describe('#createRealmRole()', function(done){
			it('should create a new role in the realm', function (done) {
				var params = _.clone(adminAuthBlock);
				params.realmName = realmId;
				params.role = newRole;
				voyent.io.admin.createRealmRole(params).then(function(json){
					console.log('createRealmRole: ' + JSON.stringify(json));
					done();
				}).catch(function(error){
					console.log('createRealmRole failed ' + error);
					assert(false, 'getAccount failed ' + error);
				});
			});
		})
		describe('#getRealmRoles()', function(done){
			it('should return a list of roles for the realm', function (done) {
				var params = _.clone(adminAuthBlock);
				params.realmName = realmId;
				voyent.io.admin.getRealmRoles(params).then(function(json){
					console.log('getRealmRoles: ' + JSON.stringify(json));
					done();
				}).catch(function(error){
					assert(false, 'getRealmRoles failed ' + error);
				});
			});
		});
		describe('#updateRealmRole()', function(done){
			it('should update a realm role', function (done) {

				newRole.permissions.push('services.event.doGet');
				var params = _.clone(adminAuthBlock);
				params.realmName = realmId;
				params.role = newRole;

				voyent.io.admin.updateRealmRole(params).then(function(json){
					console.log('updateRealmRole: ' + JSON.stringify(json));
					done();
				}).catch(function(error){
					assert(false, 'updateRealmRole failed ' + error);
				});
			});
		});
		describe('#deleteRealmRole()', function(done){
			it('should delete a realm role', function (done) {

				newRole.permissions.push('services.event.doGet');
				var params = _.clone(adminAuthBlock);
				params.realmName = realmId;
				params.id = newRole.name;

				voyent.io.admin.deleteRealmRole(params).then(function(){
					done();
				}).catch(function(error){
					assert(false, 'deleteRealmRole failed ' + error);
				});
			});
		});
	});

	describe('Admin Administrator Functions', function(done){
		describe('#createAdministrator()', function(done){
			it('should create a new administrator in the account', function (done) {
				var params = _.clone(adminAuthBlock);
				params.admin = {
					username: 'test_admin_' + new Date().getTime(),
					firstname: 'Test',
					lastname: 'Admin',
					password: 'password',
					email: 'test@test.com'
				};
				voyent.io.admin.createAdministrator(params).then(function(json){
					console.log('createAdministrator: ' + JSON.stringify(json));
					params.username = params.admin.username;
					voyent.io.admin.deleteAdministrator(params); //clean up
					done();
				}).catch(function(error){
					console.log('createAdministrator failed ' + error);
					assert(false, 'createAdministrator failed ' + error);
				});
			});
		});
		describe('#updateAdministrator()', function(done){
			it('should update an existing administrator in the account', function (done) {
				//http://jira.icesoft.org/browse/NTFY-310
				var params = _.clone(adminAuthBlock);
				params.admin = {
					username: 'test_admin_' + new Date().getTime(),
					firstname: 'Test',
					lastname: 'Admin',
					password: 'password',
					email: 'test@test.com'
				};
				voyent.io.admin.createAdministrator(params).then(function(json){
					console.log('createAdministrator: ' + JSON.stringify(json));
					params.admin.lastname = 'Updated';
					return voyent.io.admin.updateAdministrator(params);
				}).then(function(response){
					voyent.io.admin.deleteAdministrator(params); //clean up
					done();
				}).catch(function(error){
					console.log('updateAdministrator failed ' + error);
					assert(false, 'updateAdministrator failed ' + error);
				});
			});
		});
		describe('#deleteAdministrator()', function(done){
			it('should delete an existing administrator in the account', function (done) {
				var params = _.clone(adminAuthBlock);
				params.admin = {
					username: 'test_admin_' + new Date().getTime(),
					firstname: 'Test',
					lastname: 'Admin',
					password: 'password',
					email: 'test@test.com'
				};
				voyent.io.admin.createAdministrator(params).then(function(json){
					console.log('deleteAdministrator: ' + JSON.stringify(json));
					params.username = params.admin.username;
					delete params.admin;
					return voyent.io.admin.deleteAdministrator(params);
				}).then(function(response){
					done();
				}).catch(function(error){
					console.log('deleteAdministrator failed ' + error);
					assert(false, 'deleteAdministrator failed ' + error);
				});
			});
		});
	});

	

	

	

	

	

	

	
});
