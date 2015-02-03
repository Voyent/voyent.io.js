describe('bridgeit.io.metrics', function () {

	describe('#findMetrics()', function(){

		var expression = "storage(size)";
		var start = "2015-01-05T04:00:00.000Z";
		var limit = 50;

		it('should return a list of metrics for the realm', function (done) {
			bridgeit.io.auth.login({
				account: accountId,
				username: adminId,
				password: adminPassword,
				host: host
			}).then(function(){
				return bridgeit.io.metrics.findMetrics({
					account: accountId,
					realm: realmId,
					host: host,
					expression: expression,
					start: start,
					limit: limit
				})
			}).then(function(results){
				console.log('findMetrics found ' + results.length + ' metrics');
				done();
			}).catch(function(error){
				console.log('findMetrics failed ' + error);
			});
		});
	});

	describe('#getClientServerTimeGap()', function(){

		it('should return the client/server time gap in milliseconds', function (done) {
			bridgeit.io.auth.login({
				account: accountId,
				username: adminId,
				password: adminPassword,
				host: host
			}).then(function(){
				return bridgeit.io.metrics.getClientServerTimeGap({
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
				console.log('getClientServerTimeGap failed ' + error);
			});
		});
	});

	describe('#addCustomMetric()', function(){

		it('should store a custom metric', function (done) {
			var now = new Date().getTime();
			var metric = {
				value: 123,
				time: now
			};
			return bridgeit.io.auth.login({
				account: accountId,
				username: adminId,
				password: adminPassword,
				host: host
			}).then(function(){
				return bridgeit.io.metrics.addCustomMetric({
					realm: realmId,
					metric: metric,
					type: 'test'
				})
			}).then(function(){
				console.log('addCustomMetric successful ');
				done();
			}).catch(function(error){
				console.log('addCustomMetric failed ' + error);
			});
		});
	});
});