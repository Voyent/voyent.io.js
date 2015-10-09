describe('bridgeit.io.auth', function () {
	this.timeout(10000);

	var assert = chai.assert;

	function validateAuthResponse(response){
		return response.access_token && response.expires_in;
	}

	describe('#getNewAcessToken()', function(){
		
		it('should retrieve a new access token', function (done) {
			bridgeit.io.auth.getNewAccessToken({
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

			bridgeit.io.auth.login({
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

			bridgeit.io.auth.login({
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

			bridgeit.io.auth.login({
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

			bridgeit.io.auth.login({
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

			bridgeit.io.auth.login({
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

			bridgeit.io.auth.login({
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

			bridgeit.io.auth.login({
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
			bridgeit.io.auth.connect({
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
			bridgeit.io.auth.login({
				account: accountId,
				username: adminId,
				password: adminPassword,
				host: host
			}).then(function(authResponse){
				if( bridgeit.io.auth.isLoggedIn()){
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
			bridgeit.io.auth.connect({
				account: accountId,
				username: adminId,
				password: adminPassword,
				host: host
			}).then(function(response){
				bridgeit.io.auth.disconnect();
			}).then(function(response){
				var isLoggedIn = bridgeit.io.auth.isLoggedIn();
				var lastAccount = bridgeit.io.auth.getLastKnownAccount();
				var lastRealm = bridgeit.io.auth.getLastKnownRealm();
				var lastToken = bridgeit.io.auth.getLastAccessToken();
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
			bridgeit.io.auth.login({
				account: accountId,
				username: adminId,
				password: adminPassword,
				host: host
			}).then(function(authResponse){
				if( bridgeit.io.auth.getLastAccessToken() === authResponse.access_token){
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
			bridgeit.io.auth.login({
				account: accountId,
				username: adminId,
				password: adminPassword,
				host: host
			}).then(function(authResponse){
				var tokenSetAt = bridgeit.io.auth.getTokenSetAtTime();
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
			bridgeit.io.auth.login({
				account: accountId,
				username: adminId,
				password: adminPassword,
				host: host
			}).then(function(authResponse){
				var expiresIn = bridgeit.io.auth.getExpiresIn();
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
			bridgeit.io.auth.login({
				account: accountId,
				username: adminId,
				password: adminPassword,
				host: host
			}).then(function(authResponse){
				var timeRemaining = bridgeit.io.auth.getTimeRemainingBeforeExpiry();
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
			bridgeit.io.auth.connect({
				account: accountId,
				username: adminId,
				password: adminPassword,
				host: host
			}).then(function(response){
				if( bridgeit.io.auth.getConnectSettings() ){
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
			bridgeit.io.auth.login({
				account: accountId,
				username: adminId,
				password: adminPassword,
				host: host
			}).then(function(authResponse){
				if( bridgeit.io.auth.getLastKnownAccount() === accountId){
					done();
				}
			}).catch(function(error){
				console.log('getLastKnownAccount failed ' + error);
			});
		});
	});

	describe('#getLastKnownRealm()', function(){
		it('should login as a realm user then return the same realm name', function (done) {
			bridgeit.io.auth.login({
				account: accountId,
				realm: realmId,
				username: userId,
				password: userPassword,
				host: host
			}).then(function(authResponse){
				if( bridgeit.io.auth.getLastKnownRealm() === realmId){
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

			bridgeit.io.auth.registerAsNewUser({
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
					'bridgeit.doc.saveDocument',
					'bridgeit.doc.getDocument',
					'bridgeit.doc.deleteDocument',
					'bridgeit.doc.updateDocument'
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
			bridgeit.io.auth.login({
				account: accountId,
				username: adminId,
				password: adminPassword,
				host: host
			}).then(function(){
			//create the test role
				return bridgeit.io.admin.createRealmRole({role: newRole, realmName: realmId});
			}).then(function(){
			//create the test user with the new role
				return bridgeit.io.admin.createRealmUser({user: newUser, realmName: realmId});
			}).then(function(){
			//login as the new user
				return bridgeit.io.auth.login({
					account: accountId,
					realm: realmId,
					username: newUser.username,
					password: newUser.password,
					host: host
				});
			}).then(function(authResponse){
			//check that the new user has the new role
				return bridgeit.io.auth.checkUserRole({
					accessToken: authResponse.access_token,
					role: newRole.name
				});
			}).then(function(checkUserRoleResp){
				done();
			}).catch(function(error){
				assert(false, 'checkUserRole failed ' + JSON.stringify(error));
			});

		});
	});	
	
});