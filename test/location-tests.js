describe('bridgeit.io.location', function(){

	var newRegion = { 
				location: {
					properties: {
						country: 'Canada'
					}
				}
			};
	
	var validMonitorWithoutId = {
		label: 'Various Cities Monitor',
		active: true,
		elapsedTimeLimit: 5,
		locationChangeLimit: 100,
		locationNearLimit: 1000,
		regions: {
			ids: ['Victoria', 'Calgary', 'Paris']
		},
		poi: {
			ids: ['statueofliberty'],
			tags: ['monument']
		},
		events: ['bridgeit.locate.locationChanged', 'bridgeit.locate.enteredRegion', 'bridgeit.locate.exitedRegion'],
		destinations: [
			{
				url: 'http://dev.bridgeit.io/code/bridgeit.test/flows/customflowid',
				payload: {}
			},
			{
				url: 'push://bridgeit/studentPushGroup',
				payload: {}
			},
			{
				url: 'ws://joe:seakret@bridgeit/dummyEntry',
				payload: {}
			}
		]
	};

	var validPointOfInterestWithId = {
	    _id: 'statueofliberty',
	    label: 'Statue of Liberty',
	    location: {
	        type: 'Feature',
	        geometry: {
	            type: 'Point',
	            coordinates: [
	                -74.0445004,
	                40.6892494
	            ]
	        },
	        properties: {
	            tags: ['statue', 'USA', 'tourist', 'monument']
	        }
	    }
	};

	var validLocationWithoutId = {
	    label: 'My Favourite iPad',
	    location: {
	        geometry: {
	            type: 'Point',
	            coordinates: [ -123.35, 48.43 ]
	        },
	        properties: {
	            label: 'Somewhere interesting in Victoria',
	            accuracy: 50,
	            altitude: 1000,
	            altitudeAccuracy: 5,
	            speed: 3,
	            heading: 90,
	            timestamp: '2014-04-01T11:11:11.11Z',
	            jguid: 'e33f9ce8-b9cc-40ad-8f96-ad32303bc6da'
	        }
	    }
	};

	describe('#createRegion()', function(){
		it('should create a new unnamed region and search for it', function (done) {
			
			bridgeit.io.auth.login({
				account: accountId,
				username: adminId,
				password: adminPassword,
				host: host
			}).then(function(authResponse){
				return bridgeit.io.location.createRegion({
					account: accountId,
					realm: realmId,
					host: host,
					region: newRegion
				});
			}).then(function(uri){
				console.log('new region URI: ' + uri);
				done();
			}).catch(function(error){
				console.log('createRegion failed ' + error);
			});
		});
	});

	describe('#deleteRegion()', function(){
		this.timeout(deleteTimeout);
		it('should create a new unnamed region and then delete it', function (done) {
			bridgeit.io.auth.login({
				account: accountId,
				username: adminId,
				password: adminPassword,
				host: host
			}).then(function(authResponse){
				return bridgeit.io.location.createRegion({
					account: accountId,
					realm: realmId,
					host: host,
					region: newRegion
				});
			}).then(function(uri){
				console.log('new region URI: ' + uri);
				var uriParts = uri.split('/');
				var regionId = uriParts[uriParts.length-1];
				return bridgeit.io.location.deleteRegion({
					account: accountId,
					realm: realmId,
					host: host,
					id: regionId
				})
			}).then(function(){
				console.log('successfully deleted region');
				done();
			}).catch(function(error){
				console.log('deleteRegion failed ' + error);
			});
		});
	});

	describe('#getAllRegions()', function(){
		it('should create a new unnamed region and then re-fetch it with getAllRegions()', function (done) {
			bridgeit.io.auth.login({
				account: accountId,
				username: adminId,
				password: adminPassword,
				host: host
			}).then(function(authResponse){
				return bridgeit.io.location.createRegion({
					account: accountId,
					realm: realmId,
					host: host,
					region: newRegion
				});
			}).then(function(uri){
				console.log('new region URI: ' + uri);
				var uriParts = uri.split('/');
				var regionId = uriParts[uriParts.length-1];
				return bridgeit.io.location.getAllRegions({
					account: accountId,
					realm: realmId,
					host: host
				})
			}).then(function(results){
				console.log('found ' + results.length + ' regions');
				done();
			}).catch(function(error){
				console.log('getAllRegions failed ' + error);
			});
		});
	});

	describe('#findRegions()', function(){
		it('should create a new unnamed region and then search for it with findRegions()', function (done) {
			
			bridgeit.io.auth.login({
				account: accountId,
				username: adminId,
				password: adminPassword,
				host: host
			}).then(function(authResponse){
				return bridgeit.io.location.createRegion({
					account: accountId,
					realm: realmId,
					host: host,
					region: newRegion
				});
			}).then(function(uri){
				console.log('findRegions new region URI: ' + uri);
				var uriParts = uri.split('/');
				var regionId = uriParts[uriParts.length-1];
				return bridgeit.io.location.findRegions({
					account: accountId,
					realm: realmId,
					host: host,
					query: {'location.properties.country': 'Canada'}
				})
			}).then(function(results){
				console.log('findRegions found ' + results.length + ' regions');
				done();
			}).catch(function(error){
				console.log('findRegions failed ' + error);
			});
		});
	});

	describe('#createMonitor()', function(){
		it('should create a new unnamed monitor and then fetch it with findMonitors()', function (done) {
			
			bridgeit.io.auth.login({
				account: accountId,
				username: adminId,
				password: adminPassword,
				host: host
			}).then(function(authResponse){
				return bridgeit.io.location.createMonitor({
					account: accountId,
					realm: realmId,
					host: host,
					monitor: validMonitorWithoutId
				});
			}).then(function(uri){
				console.log('new monitor URI: ' + uri);
				var uriParts = uri.split('/');
				var regionId = uriParts[uriParts.length-1];
				return bridgeit.io.location.findMonitors({
					account: accountId,
					realm: realmId,
					host: host,
					query: validMonitorWithoutId
				})
			}).then(function(results){
				console.log('found ' + results.length + ' monitors');
				done();
			}).catch(function(error){
				console.log('createMonitor failed ' + error);
			});
		});
	});

	describe('#getAllMonitors()', function(){
		it('should create a new unnamed monitor and then fetch it with getAllMonitors()', function (done) {
			bridgeit.io.auth.login({
				account: accountId,
				username: adminId,
				password: adminPassword,
				host: host
			}).then(function(authResponse){
				return bridgeit.io.location.createMonitor({
					account: accountId,
					realm: realmId,
					host: host,
					monitor: validMonitorWithoutId
				});
			}).then(function(uri){
				console.log('new monitor URI: ' + uri);
				var uriParts = uri.split('/');
				var regionId = uriParts[uriParts.length-1];
				return bridgeit.io.location.getAllMonitors({
					account: accountId,
					realm: realmId,
					host: host
				})
			}).then(function(results){
				console.log('found ' + results.length + ' monitors');
				done();
			}).catch(function(error){
				console.log('getAllMonitors failed ' + error);
			});
		});
	});

	describe('#deleteMonitor()', function(){
		this.timeout(deleteTimeout);
		it('should create a new unnamed monitor and then delete it', function (done) {
			bridgeit.io.auth.login({
				account: accountId,
				username: adminId,
				password: adminPassword,
				host: host
			}).then(function(authResponse){
				return bridgeit.io.location.createMonitor({
					account: accountId,
					realm: realmId,
					host: host,
					monitor: validMonitorWithoutId
				});
			}).then(function(uri){
				console.log('new monitor URI: ' + uri);
				var uriParts = uri.split('/');
				var monitorId = uriParts[uriParts.length-1];
				return bridgeit.io.location.deleteMonitor({
					account: accountId,
					realm: realmId,
					host: host,
					id: monitorId
				})
			}).then(function(){
				console.log('successfully deleted monitor');
				done();
			}).catch(function(error){
				console.log('deleteMonitor failed ' + error);
			});
		});
	});

	describe('#createPOI()', function(){
		it('should create a new unnamed POI and then fetch it with findPOIs()', function (done) {
			
			bridgeit.io.auth.login({
				account: accountId,
				username: adminId,
				password: adminPassword,
				host: host
			}).then(function(authResponse){
				return bridgeit.io.location.createPOI({
					account: accountId,
					realm: realmId,
					host: host,
					poi: validPointOfInterestWithId
				});
			}).then(function(uri){
				console.log('new POI URI: ' + uri);
				var uriParts = uri.split('/');
				var regionId = uriParts[uriParts.length-1];
				return bridgeit.io.location.findPOIs({
					account: accountId,
					realm: realmId,
					host: host,
					query: validPointOfInterestWithId
				})
			}).then(function(results){
				console.log('found ' + results.length + ' POIs');
				done();
			}).catch(function(error){
				console.log('createPOI failed ' + error);
			});
		});
	});

	describe('#deletePOI()', function(){
		this.timeout(deleteTimeout);
		it('should create a new unnamed POI and then delete it', function (done) {
			bridgeit.io.auth.login({
				account: accountId,
				username: adminId,
				password: adminPassword,
				host: host
			}).then(function(authResponse){
				return bridgeit.io.location.createPOI({
					account: accountId,
					realm: realmId,
					host: host,
					poi: validPointOfInterestWithId
				});
			}).then(function(uri){
				console.log('new POI URI: ' + uri);
				var uriParts = uri.split('/');
				var poiId = uriParts[uriParts.length-1];
				return bridgeit.io.location.deletePOI({
					account: accountId,
					realm: realmId,
					host: host,
					id: poiId
				})
			}).then(function(){
				console.log('successfully deleted POI');
				done();
			}).catch(function(error){
				console.log('deletePOI failed ' + error);
			});
		});
	});

	describe('#getAllPOIs()', function(){

		it('should create a new unnamed POI and then fetch it with getAllPOIs()', function (done) {
			bridgeit.io.auth.login({
				account: accountId,
				username: adminId,
				password: adminPassword,
				host: host
			}).then(function(authResponse){
				return bridgeit.io.location.createPOI({
					account: accountId,
					realm: realmId,
					host: host,
					poi: validPointOfInterestWithId
				});
			}).then(function(uri){
				console.log('new monitor URI: ' + uri);
				var uriParts = uri.split('/');
				var regionId = uriParts[uriParts.length-1];
				return bridgeit.io.location.getAllPOIs({
					account: accountId,
					realm: realmId,
					host: host
				})
			}).then(function(results){
				console.log('found ' + results.length + ' POIs');
				done();
			}).catch(function(error){
				console.log('getAllPOIs failed ' + error);
			});
		});
	});

	describe('#getLastUserLocation()', function(){

		it('should return the last know user location', function (done) {
			bridgeit.io.auth.login({
				account: accountId,
				realm: realmId,
				username: userId,
				password: userPassword,
				host: host
			}).then(function(authResponse){
				return bridgeit.io.location.updateLocation({
					location: validLocationWithoutId
				});
			}).then(function(){
				return bridgeit.io.location.getLastUserLocation({
					username: userId
				});
			}).then(function(location){
				console.log('getLastUserLocation(): ' + json);
				done();
			}).catch(function(error){
				console.log('getLastUserLocation() failed ' + error);
			});
		})
	});

	describe('#updateLocation()', function(){
		it('should update the location of the current user', function(done){
			bridgeit.io.auth.login({
				account: accountId,
				realm: realmId,
				username: userId,
				password: userPassword,
				host: host
			}).then(function(authResponse){
				return bridgeit.io.location.updateLocation({
					location: validLocationWithoutId
				});
			}).then(function(json){
				console.log('updateLocation(): ' + json);
				done();
			}).catch(function(error){
				console.log('updateLocation() failed ' + error);
			});
		});
	});

	describe('#updateLocationCoordinates()', function(){
		it('should update the location of the current user', function(done){
			bridgeit.io.auth.login({
				account: accountId,
				realm: realmId,
				username: userId,
				password: userPassword,
				host: host
			}).then(function(authResponse){
				return bridgeit.io.location.updateLocationCoordinates({
					lon: -123.35,
					lat: 48.43,
					label: 'test label'
				});
			}).then(function(json){
				console.log('updateLocationCoordinates(): ' + json);
				done();
			}).catch(function(error){
				console.log('updateLocationCoordinates() failed ' + error);
			});
		});
	});

});
