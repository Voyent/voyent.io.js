describe('voyent.io.auth', function () {
	this.timeout(10000);

	var assert = chai.assert;

	function validateAuthResponse(response){
		return response.access_token && response.expires_in;
	}

	describe('#getNewAcessToken()', function(){
		
		it('should retrieve a new access token', function (done) {
			voyent.io.auth.getNewAccessToken({
				account: accountId,
				username: adminId,
				password: adminPassword,
				host: host
			}).then(function(response){
				console.log(JSON.stringify(response));
				if( validateAuthResponse(response) )
					done();
				else{
					console.log('getNewAcessToken() failed: ' + response);
				}
			}).catch(function(error){
				console.log('getNewAcessToken failed ' + error);
			});
		});
	});

	describe('#login()', function(){
		
		it('should log in an admin', function (done) {

			voyent.io.auth.login({
				account: accountId,
				username: adminId,
				password: adminPassword,
				host: host
			}).then(function(response){
				console.log(JSON.stringify(response));
				if( validateAuthResponse(response) )
					done();
			}).catch(function(response){
				console.log('login failed ' + JSON.stringify(response));
			});

		});

		it('should fail to login in as admin', function (done) {

			voyent.io.auth.login({
				account: accountId,
				username: userId,
				password: userPassword,
				host: host
			}).then(function(response){
				console.log(JSON.stringify(response));
			}).catch(function(response){
				console.log('login failed ' + JSON.stringify(response));
				done();
			});

		});

		it('should log in a realm user', function (done) {

			voyent.io.auth.login({
				account: accountId,
				realm: realmId,
				username: userId,
				password: userPassword,
				host: host
			}).then(function(response){
				console.log(JSON.stringify(response));
				if( validateAuthResponse(response) )
					done();
			}).catch(function(response){
				console.log('login failed ' + JSON.stringify(response));
			});

		});

		it('should fail missing account', function (done) {

			voyent.io.auth.login({
				realm: realmId,
				username: userId,
				password: userPassword,
				host: host
			}).then(function(response){
				console.log(JSON.stringify(response));
			}).catch(function(response){
				console.log('login failed test success');
				done();
			});

		});

		it('should fail missing username', function (done) {

			voyent.io.auth.login({
				realm: realmId,
				account: accountId,
				password: userPassword,
				host: host
			}).then(function(response){
				console.log(JSON.stringify(response));
			}).catch(function(response){
				console.log('login failed test success');
				done();
			});

		});

		it('should fail missing password', function (done) {

			voyent.io.auth.login({
				realm: realmId,
				account: accountId,
				username: userId,
				host: host
			}).then(function(response){
				console.log(JSON.stringify(response));
			}).catch(function(response){
				console.log('login failed test success ');
				done();
			});

		});

		it('should log in with SSL', function (done) {

			voyent.io.auth.login({
				account: accountId,
				realm: realmId,
				username: userId,
				password: userPassword,
				ssl: true,
				host: host
			}).then(function(response){
				console.log(JSON.stringify(response));
				if( validateAuthResponse(response) )
					done();
			}).catch(function(response){
				console.log('login failed ' + JSON.stringify(response));
			});

		});
	});

	describe('#connect()', function(){
		it('should connect as an admin', function (done) {
			voyent.io.auth.connect({
				account: accountId,
				username: adminId,
				password: adminPassword,
				host: host
			}).then(function(response){
				console.log(JSON.stringify(response));
				done();
			}).catch(function(response){
				console.log('login failed ' + JSON.stringify(response));
			});
		});
	});

	describe('#isLoggedIn()', function(){
		it('should log in as an admin then return true', function (done) {
			voyent.io.auth.login({
				account: accountId,
				username: adminId,
				password: adminPassword,
				host: host
			}).then(function(authResponse){
				if( voyent.io.auth.isLoggedIn()){
					done();
				}
				else{

				}
			}).catch(function(error){
				console.log('isLoggedIn failed ' + error);
			});
		});
	});

	describe('#disconnect()', function(){
		it('should log in as an admin then disconnect and return false from isLoggedIn()', function (done) {
			voyent.io.auth.connect({
				account: accountId,
				username: adminId,
				password: adminPassword,
				host: host
			}).then(function(response){
				voyent.io.auth.disconnect();
			}).then(function(response){
				var isLoggedIn = voyent.io.auth.isLoggedIn();
				var lastAccount = voyent.io.auth.getLastKnownAccount();
				var lastRealm = voyent.io.auth.getLastKnownRealm();
				var lastToken = voyent.io.auth.getLastAccessToken();
				if( !isLoggedIn && !lastAccount && !lastRealm && !lastToken ){
					done();
				}
				else{
					console.log('disconnect failed: loggedIn: ' + isloggedIn + ' account: ' + lastAccount +
						' realm: ' + lastRealm + ' token: ' + lastToken);
				}
			}).catch(function(error){
				console.log('disconnect failed ' + error);
			});
		});
	});

	describe('#getLastAccessToken()', function(){
		it('should log in as an admin then return the access token', function (done) {
			voyent.io.auth.login({
				account: accountId,
				username: adminId,
				password: adminPassword,
				host: host
			}).then(function(authResponse){
				if( voyent.io.auth.getLastAccessToken() === authResponse.access_token){
					done();
				}
			}).catch(function(error){
				console.log('getLastAccessToken failed ' + error);
			});
		});
	});

	describe('#getTokenSetAtTime()', function(){
		it('should log in as an admin then return the time the token was set at', function (done) {
			var justBeforeLogin = new Date().getTime();
			voyent.io.auth.login({
				account: accountId,
				username: adminId,
				password: adminPassword,
				host: host
			}).then(function(authResponse){
				var tokenSetAt = voyent.io.auth.getTokenSetAtTime();
				if( tokenSetAt >= justBeforeLogin){
					done();
				}
				else{
					console.log('invalid getTokenSetAtTime(): ' + tokenSetAt + ' < ' + justBeforeLogin);
				}
			}).catch(function(error){
				console.log('getTokenSetAtTime failed ' + error);
			});
		});
	});

	describe('#getExpiresIn()', function(){
		it('should log in as an admin then return the expires in period', function (done) {
			voyent.io.auth.login({
				account: accountId,
				username: adminId,
				password: adminPassword,
				host: host
			}).then(function(authResponse){
				var expiresIn = voyent.io.auth.getExpiresIn();
				if( typeof expiresIn === 'number' && expiresIn == authResponse.expires_in){
					done();
				}
			}).catch(function(error){
				console.log('getExpiresIn failed ' + error);
			});
		});
	});

	describe('#getTimeRemainingBeforeExpiry()', function(){
		it('should log in as an admin then return a number less than expires_in', function (done) {
			voyent.io.auth.login({
				account: accountId,
				username: adminId,
				password: adminPassword,
				host: host
			}).then(function(authResponse){
				var timeRemaining = voyent.io.auth.getTimeRemainingBeforeExpiry();
				if( timeRemaining < authResponse.expires_in){
					done();
				}
				else{
					console.log('getTimeRemainingBeforeExpiry() failed: time remaining=' + timeRemaining + ' expires_in=' + authResponse.expires_in);
				}
			}).catch(function(error){
				console.log('getTimeRemainingBeforeExpiry failed ' + error);
			});
		});
	});

	describe('#getConnectSettings()', function(){
		it('should connect in as an admin then return a JSON object of the connect settings', function (done) {
			voyent.io.auth.connect({
				account: accountId,
				username: adminId,
				password: adminPassword,
				host: host
			}).then(function(response){
				if( voyent.io.auth.getConnectSettings() ){
					done();
				}
				else{
					try{
						console.log('getConnectSettings() failed: ' + JSON.stringify(response));
					}
					catch(e){
						console.log('getConnectSettings() failed: ' + response);
					}
				}
			}).catch(function(error){
				console.log('getConnectSettings failed ' + error);
			});
		});
	});

	describe('#getLastKnownAccount()', function(){
		it('should login as an admin then return the same account name', function (done) {
			voyent.io.auth.login({
				account: accountId,
				username: adminId,
				password: adminPassword,
				host: host
			}).then(function(authResponse){
				if( voyent.io.auth.getLastKnownAccount() === accountId){
					done();
				}
			}).catch(function(error){
				console.log('getLastKnownAccount failed ' + error);
			});
		});
	});

	describe('#getLastKnownRealm()', function(){
		it('should login as a realm user then return the same realm name', function (done) {
			voyent.io.auth.login({
				account: accountId,
				realm: realmId,
				username: userId,
				password: userPassword,
				host: host
			}).then(function(authResponse){
				if( voyent.io.auth.getLastKnownRealm() === realmId){
					done();
				}
			}).catch(function(error){
				console.log('getLastKnownRealm failed ' + error);
			});
		});
	});

	describe('#registerAsNewUser()', function(){
		it('should create a new user in the realm', function (done) {

			var newUserId = 'user' + new Date().getTime();

			voyent.io.auth.registerAsNewUser({
				account: accountId,
				realm: realmId,
				username: newUserId,
				password: userPassword,
				firstname: 'First',
				lastname: 'Last',
				email: 'user@email.com',
				host: host,
				custom: {
					preferred_correspondence: 'email'
				}
			}).then(function(){
				console.log('registerAsNewUser() created new user');
				done();
			}).catch(function(error){
				console.log('registerAsNewUser() failed ' + error);
			});
		});
	});	

	describe('#checkUserRole()', function(){
		it('should check that a user has a valid role', function (done) {

			var newRole = {
				name: 'my_role_' + new Date().getTime(),
				permissions: [
					'services.doc.saveDocument',
					'services.doc.getDocument',
					'services.doc.deleteDocument',
					'services.doc.updateDocument'
				]
			};

			var newUser = {
				username: 'test_' + new Date().getTime(),
				firstname: 'test',
				lastname: 'test',
				email: 'test@email.com',
				password: 'password',
				roles: [newRole.name]
			};

			//login as admin
			voyent.io.auth.login({
				account: accountId,
				username: adminId,
				password: adminPassword,
				host: host
			}).then(function(){
			//create the test role
				return voyent.io.admin.createRealmRole({role: newRole, realmName: realmId});
			}).then(function(){
			//create the test user with the new role
				return voyent.io.admin.createRealmUser({user: newUser, realmName: realmId});
			}).then(function(){
			//login as the new user
				return voyent.io.auth.login({
					account: accountId,
					realm: realmId,
					username: newUser.username,
					password: newUser.password,
					host: host
				});
			}).then(function(authResponse){
			//check that the new user has the new role
				return voyent.io.auth.checkUserRole({
					accessToken: authResponse.access_token,
					role: newRole.name
				});
			}).then(function(checkUserRoleResp){
				done();
			}).catch(function(error){
				assert(false, 'checkUserRole failed ' + JSON.stringify(error));
			});

		});

		it('should fail with a check on an invalid role', function (done) {

			var newUser = {
				username: 'test_' + new Date().getTime(),
				firstname: 'test',
				lastname: 'test',
				email: 'test@email.com',
				password: 'password',
				roles: [newRole.name]
			};

			//login as admin
			voyent.io.auth.login({
				account: accountId,
				username: adminId,
				password: adminPassword,
				host: host
			}).then(function(){
			//create the test role
				return voyent.io.admin.createRealmRole({role: newRole, realmName: realmId});
			}).then(function(){
			//create the test user with the new role
				return voyent.io.admin.createRealmUser({user: newUser, realmName: realmId});
			}).then(function(){
			//login as the new user
				return voyent.io.auth.login({
					account: accountId,
					realm: realmId,
					username: newUser.username,
					password: newUser.password,
					host: host
				});
			}).then(function(authResponse){
			//check that the new user has the new role
				return voyent.io.auth.checkUserRole({
					accessToken: authResponse.access_token,
					role: 'invalid_role'
				});
			}).then(function(checkUserRoleResp){
				assert(false, 'checkUserRole failed ' + JSON.stringify(error));
			}).catch(function(error){
				done();
			});

		});
	});	

	describe('#checkUserRoles()', function(){
		it('should check that a user has a set of valid roles', function (done) {

			var ts = new Date().getTime();

			var newRole1 = {
				name: 'my_role_' + ts + '_a',
				permissions: [
					'services.doc.saveDocument'
				]
			};

			var newRole2 = {
				name: 'my_role_' + ts + '_b',
				permissions: [
					'services.doc.saveDocument'
				]
			};

			var newUser = {
				username: 'test_' + ts,
				firstname: 'test',
				lastname: 'test',
				email: 'test@email.com',
				password: 'password',
				roles: [newRole1.name, newRole2.name]
			};

			//login as admin
			voyent.io.auth.login({
				account: accountId,
				username: adminId,
				password: adminPassword,
				host: host
			}).then(function(){
			//create the test role 1
				return voyent.io.admin.createRealmRole({role: newRole1, realmName: realmId});
			}).then(function(){
			//create the test role 2
				return voyent.io.admin.createRealmRole({role: newRole2, realmName: realmId});
			}).then(function(){
			//create the test user with the new role
				return voyent.io.admin.createRealmUser({user: newUser, realmName: realmId});
			}).then(function(){
			//login as the new user
				return voyent.io.auth.login({
					account: accountId,
					realm: realmId,
					username: newUser.username,
					password: newUser.password,
					host: host
				});
			}).then(function(authResponse){
			//check that the new user has the new role
				return voyent.io.auth.checkUserRoles({
					accessToken: authResponse.access_token,
					roles: [newRole1.name, newRole2.name]
				});
			}).then(function(checkUserRolesResp){
				done();
			}).catch(function(error){
				assert(false, 'checkUserRoles failed ' + JSON.stringify(error));
			});

		});

		it('should check that a user has a set of valid roles with the and op', function (done) {

			var ts = new Date().getTime();

			var newRole1 = {
				name: 'my_role_' + ts + '_a',
				permissions: [
					'services.doc.saveDocument'
				]
			};

			var newRole2 = {
				name: 'my_role_' + ts + '_b',
				permissions: [
					'services.doc.saveDocument'
				]
			};

			var newUser = {
				username: 'test_' + ts,
				firstname: 'test',
				lastname: 'test',
				email: 'test@email.com',
				password: 'password',
				roles: [newRole1.name, newRole2.name]
			};

			//login as admin
			voyent.io.auth.login({
				account: accountId,
				username: adminId,
				password: adminPassword,
				host: host
			}).then(function(){
			//create the test role 1
				return voyent.io.admin.createRealmRole({role: newRole1, realmName: realmId});
			}).then(function(){
			//create the test role 2
				return voyent.io.admin.createRealmRole({role: newRole2, realmName: realmId});
			}).then(function(){
			//create the test user with the new role
				return voyent.io.admin.createRealmUser({user: newUser, realmName: realmId});
			}).then(function(){
			//login as the new user
				return voyent.io.auth.login({
					account: accountId,
					realm: realmId,
					username: newUser.username,
					password: newUser.password,
					host: host
				});
			}).then(function(authResponse){
			//check that the new user has the new role
				return voyent.io.auth.checkUserRoles({
					accessToken: authResponse.access_token,
					roles: [newRole1.name, newRole2.name],
					op: 'and'
				});
			}).then(function(checkUserRolesResp){
				done();
			}).catch(function(error){
				assert(false, 'checkUserRoles failed ' + JSON.stringify(error));
			});

		});

		it('should check that a user has a set of valid and invalid roles with the or op', function (done) {

			var ts = new Date().getTime();

			var newRole1 = {
				name: 'my_role_' + ts + '_a',
				permissions: [
					'services.doc.saveDocument'
				]
			};

			var newRole2 = {
				name: 'my_role_' + ts + '_b',
				permissions: [
					'services.doc.saveDocument'
				]
			};

			var newUser = {
				username: 'test_' + ts,
				firstname: 'test',
				lastname: 'test',
				email: 'test@email.com',
				password: 'password',
				roles: [newRole1.name, newRole2.name]
			};

			//login as admin
			voyent.io.auth.login({
				account: accountId,
				username: adminId,
				password: adminPassword,
				host: host
			}).then(function(){
			//create the test role 1
				return voyent.io.admin.createRealmRole({role: newRole1, realmName: realmId});
			}).then(function(){
			//create the test role 2
				return voyent.io.admin.createRealmRole({role: newRole2, realmName: realmId});
			}).then(function(){
			//create the test user with the new role
				return voyent.io.admin.createRealmUser({user: newUser, realmName: realmId});
			}).then(function(){
			//login as the new user
				return voyent.io.auth.login({
					account: accountId,
					realm: realmId,
					username: newUser.username,
					password: newUser.password,
					host: host
				});
			}).then(function(authResponse){
			//check that the new user has the new role
				return voyent.io.auth.checkUserRoles({
					accessToken: authResponse.access_token,
					roles: [newRole1.name, newRole2.name, 'invalid_role'],
					op: 'or'
				});
			}).then(function(checkUserRolesResp){
				done();
			}).catch(function(error){
				assert(false, 'checkUserRoles failed ' + JSON.stringify(error));
			});

		});

		it('should fail on a check for invalid roles', function (done) {

			var ts = new Date().getTime();

			var newUser = {
				username: 'test_' + ts,
				firstname: 'test',
				lastname: 'test',
				email: 'test@email.com',
				password: 'password'
			};

			//login as admin
			voyent.io.auth.login({
				account: accountId,
				username: adminId,
				password: adminPassword,
				host: host
			}).then(function(){
			//create the test user with the new role
				return voyent.io.admin.createRealmUser({user: newUser, realmName: realmId});
			}).then(function(){
			//login as the new user
				return voyent.io.auth.login({
					account: accountId,
					realm: realmId,
					username: newUser.username,
					password: newUser.password,
					host: host
				});
			}).then(function(authResponse){
			//check that the new user has the new role
				return voyent.io.auth.checkUserRoles({
					accessToken: authResponse.access_token,
					roles: ['invalid_role']
				});
			}).then(function(checkUserRolesResp){
				assert(false, 'checkUserRoles failed ' + JSON.stringify(error));
			}).catch(function(error){
				done();
			});

		});
	});	

	describe('#forgotPassword()', function(){
		it('should send the admin password in email', function (done) {

			//login as admin
			voyent.io.auth.forgotPassword({
				account: accountId,
				username: adminId,
				host: host
			}).then(function(result){
				assert(result, 'forgotPassword failed, result was false');
				done();
			}).catch(function(error){
				assert(false, 'forgotPassword failed ' + JSON.stringify(error));
			});

		});

		it('should send the realm user password in email', function (done) {

			//login as admin
			voyent.io.auth.forgotPassword({
				account: accountId,
				username: userId,
				realm: realmId,
				host: host
			}).then(function(result){
				assert(result, 'forgotPassword failed, result was false');
				done();
			}).catch(function(error){
				assert(false, 'forgotPassword failed ' + JSON.stringify(error));
			});

		});

		
	});	
	
});