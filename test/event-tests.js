describe('voyent.io.event', function () {
	this.timeout(10000);
	describe('#findEvents()', function(){

		it('should return a list of 100 storage events for the realm', function (done) {
			voyent.io.auth.login({
				account: accountId,
				username: adminId,
				password: adminPassword,
				host: host
			}).then(function(){
				return voyent.io.event.findEvents({
					account: accountId,
					realm: realmId,
					host: host,
                    query: {"service":"storage"},
                    options: {"limit":100, "sort":{"service":1}}
				})
			}).then(function(results){
                console.log('findEvents found ' + results.length + ' events');
                if (results.length === 0 || (results.length <= 100 && results[0].service === 'storage' 
                    && results[results.length-1].service === 'storage')) {
                    done();
                }
                else {
                    console.log('findEvents() response was incorrect for the query');
                }
			}).catch(function(error){
				console.log('findEvents failed',error);
			});
		});
	});

	describe('#getClientServerTimeGap()', function(){

		it('should return the client/server time gap in milliseconds', function (done) {
			voyent.io.auth.login({
				account: accountId,
				username: adminId,
				password: adminPassword,
				host: host
			}).then(function(){
				return voyent.io.event.getClientServerTimeGap({
					account: accountId,
					realm: realmId,
					host: host
				})
			}).then(function(milliseconds){
				console.log('getClientServerTimeGap found a time gap of ' + milliseconds);
				if( typeof milliseconds === 'number'){
					done();
				}
				else{
					console.log('getClientServerTimeGap() response was not a number');
				}
			}).catch(function(error){
				console.log('getClientServerTimeGap failed',error);
			});
		});
	});

	describe('#createCustomEvent()', function(){

		it('should store a custom event', function (done) {
            var event = {
                time: new Date().toISOString(),
                event : "login",
                username : "johnsmith",
                data: {
                    origin: "http://mycustomapp.com/login"
                }
            };
			voyent.io.auth.login({
				account: accountId,
				username: adminId,
				password: adminPassword,
				host: host
			}).then(function(){
				return voyent.io.event.createCustomEvent({
                    account: accountId,
                    realm: realmId,
                    host: host,
					event: event
				})
			}).then(function() {
                console.log('createCustomEvent successful');
				done();
			}).catch(function(error) {
                console.log('createCustomEvent failed',error);
			});
		});
	});
});